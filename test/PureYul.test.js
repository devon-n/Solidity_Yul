const { expect } = require("chai")

describe("Pure Yul Contract", async () => {

    let pureYulInstance;

    beforeEach(async () => {
        const abi = require("../build/PureYul.abi.json")
        const bytecode = require("../build/PureYul.bytecode.json")
        const PureYulContract = await hre.ethers.getContractFactory(abi, bytecode)

        pureYulInstance = await PureYulContract.deploy()
        await pureYulInstance.waitForDeployment()
    })

    describe("Deployment", async () => {
        it("Should deploy correctly", async () => {
            await expect(await pureYulInstance.getAddress()).is.properAddress;
            await expect(pureYulInstance).is.not.null;
        })
    })

    describe("Functions", async () => {
        it("Should return myFunc()", async () => {
            expect(await pureYulInstance.myFunc()).to.equal(4)
        })
    })
})