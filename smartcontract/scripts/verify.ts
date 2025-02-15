import { run, network } from "hardhat";

async function main() {
  console.log(`Verifying contract on network: ${network.name}`);

  await run("verify:verify", {
    address: "0xbEf369EeAd7d6ef05d200f2E05bF3AfB4e940024",
    constructorArguments: [
      [
        "0xD1d67e220E7dbb3B79051b302648E935d3C97560",
        "0x7f14dA5a598D03F3E2B9E45eE99C9E8B7e34C00c",
        "0x51960b9F53bb80C9DC2582A865593130cB7762D9",
        "0xA7e98876D5AFE1Eb9Ee0dec6e2BF9d3F8580f082",
        "0xDE7F79B1f6Aee25b45e15a365Ff521aD8ad01613",
        "0xf0f64154839f29009B7F9A10935c63108492fBe3",
        "0xA6B3ae981cd3c5e914D85ac620EcB94d4e84f768",
        "0xdF6121D00bF3c25b9f11e860a4AB6331427B4273",
        "0xE7b7071BB115887beaE904271625Aa96af66e868",
        "0x634D25b95221CF2FA8aB3F96cd8C52F052e30006",
        "0x956900Cd26030CCC7A7b30460A3AB350cd7A1A46",
        "0xCb20Fd71ea8597d31C1339d5B5F5730eb4BaAfb4",
        "0x151D83eb397bF9DB6f9d7B37e1060C60dDaD1Ebd",
        "0xef6759578EFd463b46E4bA74fa19A6Af6fcC8C80",
        "0xf1e5423D52a7730FeFa07891e5C9c2e96278333D",
        "0xaDE5ED4342A4955087a2959533087b3f0CF65AbC",
        "0xB455D45f4f05ab81B61b5642df8c003184696C86",
        "0xAa7Ba3c2ddBde2B134311f88B5Fae0250A46a554",
        "0xB1f796cd52bCee7f4662cBd8e7Fb68Ee69A59628",
        "0xcCB933d625db7425dF5bf1892AE09A97eC10E7e0",
      ],
    ],
  });

  console.log("Verification successful!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
