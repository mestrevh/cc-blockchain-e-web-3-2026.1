
async function main() {

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const contract = await HelloWorld.deploy();
    await contract.waitForDeployment();
    console.log("Contrato deployado em:", await contract.getAddress());
}


main().catch((error => {
    console.log(error);
    process.exitCode = 1;
}));