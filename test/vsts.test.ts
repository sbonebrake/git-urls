import * as path from "path";

import ConfigInfo from "../src/configInfo";
import GitUrls from "../src/index";

test("Get file URL in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        section: {
            startLine: 12,
            endLine: 23
        },
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23");
});

test("Get file URL in VSTS with SSH", async () => {
    const configInfo = {
        remoteUrl: "ssh://my-tenant@vs-ssh.visualstudio.com:22/Collection/_ssh/repo",
        branchName: "master",
        relativePath: "test/file"
    };

    const link = await GitUrls["getUrlAsync"](configInfo);
    expect(link).toBe("https://my-tenant.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL with column in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        section: {
            startLine: 12,
            endLine: 23,
            startColumn: 8,
            endColumn: 9
        },
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23&lineStartColumn=8&lineEndColumn=9");
});
