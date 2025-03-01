import Host from './host';
import GitInfo from '../gitInfo'
import ConfigInfo from "../configInfo";

export default class Vsts implements Host {
    /**
     * The regular expression to match the VSTS Git URL.
     * @example https://my-tenant.visualstudio.com/DefaultCollection/MyCollection/_git/my-repo
     * @example ssh://my-tenant@my-tenant.visualstudio.com:22/DefaultCollection/MyCollection/_ssh/my-repo
     */
    private static urlRegex: RegExp = /(?:https:\/\/|ssh:\/\/)([\w-]+)@?.*\.visualstudio\.com(?:\:\d+)?\/(.+)\/(?:_git|_ssh)\/([^/]+)/i;

    public static match(url: string): boolean {
        return Vsts.urlRegex.test(url);
    }

    public parse(info: ConfigInfo): GitInfo {
        return {
            repoName: info.remoteUrl,
            branchName: info.branchName,
            userName: ''
        }
    }

    public assemble(info: GitInfo): string {
        const baseUrl = info.repoName.replace(Vsts.urlRegex, "https://$1.visualstudio.com/$2/_git/$3");
        const path: string = encodeURIComponent(`/${info.relativefilePath}`);
        let url = `${baseUrl}?path=${path}&version=GB${info.branchName}&_a=contents`;

        if (info.section && info.section.startLine && info.section.endLine) {
            url += `&lineStyle=plain&line=${info.section.startLine}&lineEnd=${info.section.endLine}`;

            if (info.section.startColumn && info.section.endColumn) {
                url += `&lineStartColumn=${info.section.startColumn}&lineEndColumn=${info.section.endColumn}`;
            }
        }

        return url;
    }
}
