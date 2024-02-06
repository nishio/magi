import { generate_svg } from "../../t/generate_svg";
import { discussions } from "@/lib/data"; // Assuming this function exists for fetching discussion data by ID
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // const discussion = await getDiscussionById(id); // Fetch the discussion data based on the ID
    // if (!discussion) {
    //   res.status(404).send('Not Found');
    //   return;
    // }
    const d = discussions[0];

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
