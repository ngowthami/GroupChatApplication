const _ = require('lodash');
const GroupModel = require('../db/models/GroupModel');

const createGroup = async (req, res) => {
  try {
    const payload = req.body;
    const isExist = await GroupModel.getGroupData(payload.name);
    if (isExist && isExist.result.length > 0) {
      return res.status(400).json({ error: 'Group already exists', message: 'The provided group is already in use.' });
    }
    const data = await GroupModel.createNewGroup(payload);
    if (data && data.status === 'success') {
      return res.status(200).json(data.result);
    } else {
      return res.status(400).json(result.error)
    }
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while creating the group.' });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const grpId = req.params.groupId;
    const result = await GroupModel.deleteGroup(grpId);

    if (result.status === 'success') {
      return res.status(200).send({ message: 'Group deleted successfully.' });
    } else {
      return res.status(400).send({ message: 'Failed to delete the group. Please check the provided group ID.' });
    }
  } catch (error) {
    console.error("Error during group deletion:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while deleting the group.' });
  }
}

const addUsersIntoGrp = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const payload = req.body;
    const result = await GroupModel.addMembers(groupId, payload);

    if (result.status === 'success') {
      return res.status(200).send({ message: 'User added to the group successfully.' });
    } else {
      return res.status(400).send({ message: 'User already exist in this group. Please check the provided group ID and user details.' });
    }
  } catch (error) {
    console.error("Error during user inviting into group:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while adding user to the group.' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const result = await GroupModel.getUsers(groupId);
    if (_.get(result, 'status') === 'success') {
      return res.status(200).json({ result: result });
    } else {
      return res.status(400).json({ message: 'Unable to fetch users list' });
    }
  } catch (error) {
    console.error("Error during fetching users:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred while fetching users.' });
  }
}

const search = async (req, res) => {
  try {
    const { query } = req.query;
    const result = await GroupModel.searchQuery(query);
    if (result && result.status === 'success') {
      return res.status(200).json({ result: result });
    }
  } catch (error) {
    console.error('Error searching groups:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createGroup,
  deleteGroup,
  addUsersIntoGrp,
  getAllUsers,
  search
}