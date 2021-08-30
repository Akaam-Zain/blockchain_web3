pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint256 public productCount = 0;

    //Being added to the blockchain
    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner;
        bool purchased;
    }

    constructor() public {
        name = "HashTag";
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool purchased
    );

    function createProduct(string memory _name, uint256 _price) public {
        //Make sure parameters are correct
        //Increment products count
        productCount++;
        //Create the product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        );
        //Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}
