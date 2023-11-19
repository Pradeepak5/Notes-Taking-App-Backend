const { generateToken } = require('../middleware/token-validation/generateToken.middleware');
const userModel = require('../models/userSchema');
const noteModel = require('../models/noteSchema');

const Register = async (req,res) => {
    try{
        const { userName, email, password } = req.body;
        const isUserExists = await userModel.findOne({email: email});
        console.log(isUserExists)

        if(!isUserExists){
            const createUser = new userModel({
                userName,
                email,
                password
            })
            console.log(userName,"userName")
            await createUser.save();
            res.status(201).send({message: "User Registered Successfully"});
        }else{
            res.status(409).send({message: "User already exists"});
        }
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal Server Error"});
    }
}

const Login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const isEmailExists = await userModel.findOne({email: email})
        if(isEmailExists){
            if(isEmailExists.password == password){
                const token = await generateToken({
                    id: isEmailExists._id,
                    email: email
                });
                res.status(200).send({message: "Login Success", _id: isEmailExists._id, access_token: token})
            }else{
                res.status(401).send({message: "Invalid Credential"});
            }
        }else{
            res.status(403).send({message: "User not yet registered."})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const getNotes = async (req,res) => {
    try{
        const {id} = req.params;
        const notes = await noteModel.find({userId: id})
        res.status(200).send({message: "Notes Fetched Successfully", notes});
    }catch(err){
        res.status(500).send({message: "Internal Server Error"});
    }
}

const createNotes = async (req,res) => {
    try{
        const {id} = req.params;
        const {notes} = req.body;
        const createNote = new noteModel({
            userId: id,
            notes: notes,
        })
        await createNote.save();
        res.status(201).send({message: 'Note added successfully'});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

const editNotes = async (req,res) => {
    try{
        const {noteId} = req.params;
        const {notes} = req.body;
        const isNoteExist = await noteModel.findOne({_id: noteId});
        if(isNoteExist){
            await noteModel.findOneAndUpdate({_id: noteId},{$set:{notes}})
            res.status(201).send({message: 'Note updated successfully'});
        }else{
            res.status(403).send({message: "Note not found"});
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Internal Server Error"});
    }
}

const deleteNotes = async (req,res) => {
    try{
        const {noteId} = req.params;
        const isNoteExist = await noteModel.findOne({_id: noteId});
        if(isNoteExist){
            await noteModel.findOneAndDelete({_id: noteId});
            res.status(201).send({message: 'Note deleted successfully'});
        }else{
            res.status(403).send({message: "Note not found"});
        }
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

const viewNotes = async (req,res) => {
    try{
        const {noteId} = req.params;
        const isNoteExist = await noteModel.findOne({_id: noteId});
        if(isNoteExist){
            res.status(201).send({message: 'Note fetched successfully', notes: isNoteExist});
        }else{
            res.status(403).send({message: "Note not found"});
        }
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

module.exports = {Register, Login, getNotes, createNotes, editNotes, deleteNotes, viewNotes}