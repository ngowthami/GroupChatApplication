const group = require('../schemas/group');
const user = require('../schemas/user');

const createNewGroup = async (data) => {
    try {
        const newGrp = new group(data);
        const result = await newGrp.save();
        return {
            status: 'success',
            result: result
        }

    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const getGroupData = async (groupName) => {
    try {
        const result = await group.find({ name: groupName })
        if (result && result.length > 0) {
            return {
                status: 'success',
                result: result
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}
const deleteGroup = async (groupId) => {
    try {
        const result = await group.deleteOne({ _id: groupId });
        if (result.deletedCount > 0) {
            return {
                status: 'success',
                message: 'Group delete successfully'
            }
        } else {
            return {
                status: 'failed',
                error: 'Error during group deletion'
            }
        }

    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const addMembers = async (groupId, userId) => {
    try {
        const isExist = await group.findOne({ _id: groupId, members: userId });

        if (isExist) {
            return {
                status: 'failed',
                error: 'User already exists in this group',
            };
        }
        await group.updateOne({ _id: groupId }, { $addToSet: { members: userId } });

        const updatedGrp = await group.findOne({ _id: groupId });

        if (updatedGrp) {
            return {
                status: 'success',
                result: updatedGrp,
            };
        } else {
            return {
                status: 'failed',
                error: 'Error during adding members',
            };
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        };
    }
};

const getUsers = async (groupId) => {
    try {
        let result = await group.findOne({ _id: groupId }, { _id: 0, members: 1 })
        users = result.members.flat();
        const usersData = await user.find({ _id: { $in: users } }, { _id: 0, username: 1 });
        if (usersData && usersData.length > 0) {
            return {
                status: 'success',
                result: usersData
            }
        } else {
            return {
                status: 'failed',
                error: 'Unable to fetch users data'
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const checkUser = async (groupId, userId) => {
    try {
        const result = await group.findOne({ _id: groupId, members: userId });
        if (result) {
            return {
                status: 'success',
                result: true
            }
        } else {
            return {
                status: 'failed',
                error: 'Unable to fetch group data'
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}

const searchQuery = async (query) => {
    try {
        const groups = await group.find({ name: { $regex: new RegExp(query, 'i') } });
        return {
            status: 'success',
            result: groups
        }

    } catch (error) {
        return {
            status: 'failed',
            error: error
        }
    }
}
module.exports = {
    createNewGroup,
    getGroupData,
    deleteGroup,
    addMembers,
    getUsers,
    checkUser,
    searchQuery
}