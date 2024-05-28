const hre = require("hardhat")

async function main() {
    const abi = require("../build/PureYul.abi.json")
    const bytecode = require("../build/PureYul.bytecode.json")
    const PureYulContract = await hre.ethers.getContractFactory(abi, bytecode)

    const pureYulInstance = await PureYulContract.deploy()
    await pureYulInstance.waitForDeployment()

    console.log(await pureYulInstance.getAddress())

    console.log(await pureYulInstance.myFunc())

    const abi = require("../build/ERC1155Yul.abi.json")
    const bytecode = require("../build/ERC1155Yul.bytecode.json")
    const ERC1155YulContract = await hre.ethers.getContractFactory(abi, bytecode)

    const ERC1155YulInstance = await ERC1155YulContract.deploy()
    await ERC1155YulInstance.waitForDeployment()

    console.log(await ERC1155YulInstance.getAddress())
}

main()