import { generate_svg } from "../../../lib/generate_svg";
import { discussions } from "@/lib/data"; // Assuming this function exists for fetching discussion data by ID
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { Request, Response } from "express";
import { get_discussion_by_id } from "@/lib/get_discussion_by_id";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query;

  try {
    const d = await get_discussion_by_id(id);
    if (!d) {
      res.status(404).send("Not Found");
      return;
    }

    const svgJSX = generate_svg(d); // Use the generate_svg function to create SVG content
    const svgContent = renderToStaticMarkup(svgJSX); // Convert JSX to string
    const svgBuffer = Buffer.from(svgContent); // Convert string to Buffer

    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(svgBuffer)
      .png() // Convert to PNG
      .toBuffer(); // Convert to Buffer for sending

    res.setHeader("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (error) {
    console.error("Error generating SVG:", error);
    res.status(500).send("Internal Server Error");
  }
}
