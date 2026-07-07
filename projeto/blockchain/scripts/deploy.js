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


  // 1. Deploy IdentityRegistry
  const IdentityRegistry = await hre.ethers.getContractFactory("IdentityRegistry");
  const identityContract = await IdentityRegistry.deploy();
  await identityContract.waitForDeployment();
  const identityAddress = await identityContract.getAddress();

  // 2. Deploy SurveillanceAudit
  const SurveillanceAudit = await hre.ethers.getContractFactory("SurveillanceAudit");
  const auditContract = await SurveillanceAudit.deploy();
  await auditContract.waitForDeployment();
  const auditAddress = await auditContract.getAddress();

  console.log("\n=== Deploy concluido ===");
  console.log("Contrato IdentityRegistry implantado em:", identityAddress);
  console.log("Contrato SurveillanceAudit implantado em:", auditAddress);
  console.log("Owner / primeiro submitter autorizado:", deployer.address);

  // --- Automacao: Atualiza o .env do Backend ---
  const fs = require("fs");
  const path = require("path");
  
  const envPath = path.join(__dirname, "../../backend/.env");
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf8");
    
    // Atualiza CONTRACT_ADDRESS
    if (envContent.includes("CONTRACT_ADDRESS=")) {
      envContent = envContent.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${auditAddress}`);
    } else {
      envContent += `\nCONTRACT_ADDRESS=${auditAddress}\n`;
    }

    // Atualiza IDENTITY_REGISTRY_ADDRESS
    if (envContent.includes("IDENTITY_REGISTRY_ADDRESS=")) {
      envContent = envContent.replace(/IDENTITY_REGISTRY_ADDRESS=.*/g, `IDENTITY_REGISTRY_ADDRESS=${identityAddress}`);
    } else {
      envContent += `\nIDENTITY_REGISTRY_ADDRESS=${identityAddress}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log(`\n✅ Enderecos dos contratos copiados automaticamente para: ${envPath}`);
  } else {
    console.log("\n⚠️ Arquivo .env do backend nao encontrado. Copie manualmente os enderecos.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
