import OpenAI from "openai";



const aichatboat=async (req ,res) => {
   try {
    const {quary}=req.body;
     const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });
    
    console.log(quary);
    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input:`tell me ${quary} exect  medicine name and the body condition and some imporatant advices`
    });
    console.log(response)
    return res.status(200).json({massage:response});


   } catch (error) {
    return res.status(400).json({massage:"wrong quary"})
   }  
}

export{aichatboat};