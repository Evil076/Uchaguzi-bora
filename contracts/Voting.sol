// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 voteTimestamp;
        string locationHash; // Encrypted location data
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256[] public candidateIds;
    
    event VoteCasted(address indexed voter, uint256 candidateId, uint256 timestamp);

    constructor(uint256[] memory _candidateIds, string[] memory _candidateNames) {
        require(_candidateIds.length == _candidateNames.length, "Mismatched inputs");
        
        for (uint256 i = 0; i < _candidateIds.length; i++) {
            candidates[_candidateIds[i]] = Candidate({
                id: _candidateIds[i],
                name: _candidateNames[i],
                voteCount: 0
            });
            candidateIds.push(_candidateIds[i]);
        }
    }

    function vote(uint256 _candidateId, string memory _locationHash) public {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(bytes(candidates[_candidateId].name).length > 0, "Invalid candidate");

        voters[msg.sender] = Voter({
            hasVoted: true,
            voteTimestamp: block.timestamp,
            locationHash: _locationHash
        });

        candidates[_candidateId].voteCount++;
        
        emit VoteCasted(msg.sender, _candidateId, block.timestamp);
    }

    function getVoteCount(uint256 _candidateId) public view returns (uint256) {
        require(bytes(candidates[_candidateId].name).length > 0, "Invalid candidate");
        return candidates[_candidateId].voteCount;
    }
}
