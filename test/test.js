const {expect} = require('chai');
const {ethers} = require('hardhat');

describe("Deploying Bank contract", function(){
    let deployer, user, attacker;

    beforeEach(async function(){
        [deployer, user, attacker] = await ethers.getSigners();

        const BankFactory = await ethers.getContractFactory("Bank", deployer);
        this.bankContract = await BankFactory.deploy();

        await this.bankContract.deposit({value: ethers.utils.parseEther("100")});
        await this.bankContract.connect(user).deposit({value: ethers.utils.parseEther("50")});


        const AttackFactory = await ethers.getContractFactory("Attack", attacker);
        this.attackContract = await AttackFactory.deploy(this.bankContract.address);

    });

    

    describe("Test deposit and withdraw of Bank Contract", function(){
        it("Should accept deposit", async function(){
            const deployerBalance = await this.bankContract.balanceOf(deployer.address);
            expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));

            const userBalance = await this.bankContract.balanceOf(user.address);
            expect(userBalance).to.eq(ethers.utils.parseEther("50"));
        });

        it("Should accept withdrawls", async function(){
            await this.bankContract.withdraw();

            const deployerBalance = await this.bankContract.balanceOf(deployer.address);
            const userBalance = await this.bankContract.balanceOf(user.address);
            
            
            expect(deployerBalance).to.eq(0);
            expect(userBalance).to.eq(ethers.utils.parseEther("50"));
        });

        it("Perform Action", async function(){
            console.log("");
            console.log("*** Before ***");
            console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
            console.log(`Attacker's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

            await this.attackContract.attack({value: ethers.utils.parseEther("10")});

            console.log("");
            console.log("*** Before ***");
            console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
            console.log(`Attacker's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

            expect(await ethers.provider.getBalance(this.bankContract.address)).to.eq(0);
        });
    });

});


describe("Deploying NewBank contract", function(){
    let deployer, user, attacker;

    beforeEach(async function(){
        [deployer, user, attacker] = await ethers.getSigners();

        const BankFactory = await ethers.getContractFactory("NewBank", deployer);
        this.bankContract = await BankFactory.deploy();

        await this.bankContract.deposit({value: ethers.utils.parseEther("100")});
        await this.bankContract.connect(user).deposit({value: ethers.utils.parseEther("50")});


        const AttackFactory = await ethers.getContractFactory("Attack", attacker);
        this.attackContract = await AttackFactory.deploy(this.bankContract.address);

    });

    

    describe("Test deposit and withdraw of Bank Contract", function(){
        it("Should accept deposit", async function(){
            const deployerBalance = await this.bankContract.balanceOf(deployer.address);
            expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));

            const userBalance = await this.bankContract.balanceOf(user.address);
            expect(userBalance).to.eq(ethers.utils.parseEther("50"));
        });

        it("Should accept withdrawls", async function(){
            await this.bankContract.withdraw();

            const deployerBalance = await this.bankContract.balanceOf(deployer.address);
            const userBalance = await this.bankContract.balanceOf(user.address);
            
            
            expect(deployerBalance).to.eq(0);
            expect(userBalance).to.eq(ethers.utils.parseEther("50"));
        });

        it("Perform Action", async function(){
            console.log("");
            console.log("*** Before ***");
            console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
            console.log(`Attacker's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

            await this.attackContract.attack({value: ethers.utils.parseEther("10")});

            console.log("");
            console.log("*** Before ***");
            console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
            console.log(`Attacker's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

            expect(await ethers.provider.getBalance(this.bankContract.address)).to.eq(0);
        });
    });

});

