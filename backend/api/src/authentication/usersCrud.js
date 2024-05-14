import { userconst } from '../models/index.js'
export const getAllUsers = async (req, res) => {
    try {
      const users = await userconst.find();
  
      if (users.length === 0) {
        res.status(404).json({ success: false, error: 'No users found' });
      } else {
        res.status(200).json({ success: true, message: 'Users retrieved successfully', data: users });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await userconst.findByIdAndDelete(id);
      if (!result) {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const result = await userconst.findByIdAndUpdate(id, updates, { new: true });
      if (!result) {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(200).json({ success: true, message: 'User updated successfully', data: result });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  export const addAdmin= async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const result = await userconst.findById(id);
      result.role="admin";
await result.save();
      if (!result) {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(200).json({ success: true, message: 'User updated successfully and is admin now', data: result });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
    
  export const removeAddimin= async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const result = await userconst.findById(id);
      result.role="user";
await result.save();
      if (!result) {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(200).json({ success: true, message: 'User updated successfully and is user by role now', data: result });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
    
