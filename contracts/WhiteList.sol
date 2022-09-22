//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;


contract WhiteList
{
    uint8 public maxWhiteListAddressAllowed;

    mapping(address => bool) public whiteListedAddress;

    uint8 public numberOfAddressWhiteListed;

    constructor(uint8 _maxWhiteListAddressAllowed)
    {
        maxWhiteListAddressAllowed = _maxWhiteListAddressAllowed;
    }


    function addAddressToWhiteList() public
    {

        require(!whiteListedAddress[msg.sender], "Address is already whitelisted");
        require(maxWhiteListAddressAllowed > numberOfAddressWhiteListed, "More address can't be listed");
        whiteListedAddress[msg.sender] = true;
        numberOfAddressWhiteListed += 1;
    }
}