const hre = require("hardhat")

async function main() {
    const abi = require("../build/PureYul.abi.json")
    const bytecode = require("../build/PureYul.bytecode.json")
    const PureYulContract = await hre.ethers.getContractFactory(abi, bytecode)

    const pureYulInstance = await PureYulContract.deploy()
    await pureYulInstance.waitForDeployment()

    console.log(await pureYulInstance.getAddress())

    console.log(await pureYulInstance.myFunc())
}

main()