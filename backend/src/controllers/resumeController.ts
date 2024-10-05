import { Request, Response } from "express";
import Resume from "../models/resumeModel";
import EmptyResume from "../constants/EmptyResume.json";
export const createResume = async (req: Request, res: Response) => {
  try {
    const { userId, ...resumeData } = req.body;
    const newResume = new Resume({
      ...resumeData,
      userId,
    });
    await newResume.save();
    res
      .status(201)
      .json({ message: "Resume created successfully", data: newResume });
  } catch (error) {
    res.status(500).json({ message: "Error creating resume", error });
  }
};

export const getResume = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    let resume = await Resume.findOne({ userId });
    if (!resume) {
      resume = new Resume({
        ...EmptyResume,
        userId,
      });
      await resume.save();
    }
    res
      .status(200)
      .json({ message: "Resume fetched successfully", data: resume });
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume", error });
  }
};

export const updateResume = async (req: Request, res: Response) => {
  try {
    const { userId, ...resumeData } = req.body;
    const resume = await Resume.findOneAndUpdate(
      { userId },
      { $set: resumeData },
      {new : true}
    );
    if (!resume) {
      res.status(404).json({ message: "Resume not found" });
    } else {
      res
        .status(200)
        .json({ message: "Resume updated successfully", data: resume });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};
