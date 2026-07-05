const hre = require("hardhat");

/**
 * Script de deploy do contrato SurveillanceAudit.
 *
 * Uso (com `npx hardhat node` rodando em outro terminal):
 *   npx hardhat run scripts/deploy.js --network localhost
 *
 * A conta que assina o deploy (accounts[0] do Hardhat) se torna o `owner`
 * do contrato e o primeiro endereco autorizado a registrar alertas. Essa
 * mesma conta (endereco + chave privada) deve ser configurada no `.env`
 * do backend NestJS (camada /backend) para que ele consiga assinar as
 * transacoes de escrita.
 */
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Realizando deploy com a conta:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Saldo da conta:", hre.ethers.formatEther(balance), "ETH");

  const SurveillanceAudit = await hre.ethers.getContractFactory("SurveillanceAudit");
  const contract = await SurveillanceAudit.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log("\n=== Deploy concluido ===");
  console.log("Contrato SurveillanceAudit implantado em:", contractAddress);
  console.log("Owner / primeiro submitter autorizado:", deployer.address);
  console.log("\nCopie o endereco acima para o .env do backend (CONTRACT_ADDRESS).");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
