import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";



export async function POST(req: any) {
    const data = await req.json();
    const { prompt } = data;
    console.log(prompt)
    // const response = await axios.post('https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA' ,
    //   prompt,
    //   {
    //     headers: {
    // 			Authorization: "Bearer "+process.env.HUGGING_FACE_API_KEY,
    // 			"Content-Type": "application/json",
    // 		},
    //     responseType:"arraybuffer"
    //   }
    // )
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
        "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
        {
            input: {
                prompt: prompt,
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 8
            }
        }
    );
    console.log(output);
    const base64ImageWithMime = await ConvertImageToBase64(output)


    //covert to base64 image

    console.log(base64ImageWithMime)

    //save to database
    return NextResponse.json({ image: base64ImageWithMime })

}

async function ConvertImageToBase64(image: any) {
    const resp = await axios.get(image, { responseType: 'arraybuffer' })
    const base64ImageRaw = Buffer.from(resp.data).toString('base64')
    return `data:image/png;base64,${base64ImageRaw}`
}