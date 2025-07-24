
// ----------------------import----------------------------------

// हम express को इम्पोर्ट करेंगे 
// हमने यहाँ package को रिक्वाइअर किया और constant मे स्टोर किया 
import express from "express";
const app = express();

// अब हम package.json मे जाएंगे और वह पर कुछ बदलाव करेंगे 
// टाइप : module ये करेंगे जाकर देखो 

// इससे होगा क्या हम generally require करके store करते है const मे 
// यहा हमने इम्पोर्ट किया 

// json मे comments नहीं डाल सकते पर मैंने 
// type की बी डिफ़ॉल्ट वैल्यू which was commonjs 
// इसके हम module कर देंगे 

// और बार बार झंझट होगा to write "npx nodemon app.js"
// scripts मे जाकर करना है ये बदलाव 
// अब npx run dev से काम चल जाएगा 

// ----------------------Port imported----------------------------------
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

// ----------------------connect db----------------------------------
import { connectDB } from "./lib/db.js";

// ----------------------other imports----------------------------------

import authRoute from "./routes/auth.route.js";
// we would hit this file when we go to this route

// ----------------------route ----------------------------------
// अब हम राउटस को add करेंगे हमारे एप मे 
// route नामक फ़ोल्डर मे राउट की सारी फिलेस होंगी उनको हम वहाँ बनेंगे 
// यहा हमने authRoute को use किया तोह वो 
// उसके फ़ोल्डर मे उसका लॉजिक है 

app.use("/api/auth", authRoute);
app.use(cookieParser());

// अब हम क्या करेंगे हम हम राउट को इम्पोर्ट करके use करेंगे 
// अब ध्यान देना 
// (ये draw करने मे टाइम लगा )
// | src 
// |------index.js इसमे हमारा main है और 
//                          इसमे हम सारे राउट इम्पोर्ट करेंगे
//                          और उनको use करेंगे 
//                          app.use मे दो चीज है 
//                          "/api/auth" ये है वो राउट जहां पर
//                          authRoute फाइल मे है 
//                          वो हमने export कराया   
//                          ./routes/auth.route.js
// |-------route>auth.route.js इसमे हमारे route कराया
//                                               सारा कोड और logic hoga 
//                                               हम इस /api/auth वाले 
//                                               path पर  further राउट बनाएंगे 
//                                               तो ये route api/auth पर है 
//                                               और आगे हमने router method से 
//                                               गेट किया इस  फाइल मे  

app.get("/", (req, res)=> {
    res.send("app running")
})






// -----------------------test if server running---------------------------------

app.listen(PORT, ()=>{
    console.log('server running');
    connectDB()
})

// यहा  app रन होने पर console log हो जाएगा कुछ 
// code explained
// app को listen करो 5001 port पर और फिर ये फलाना callback रन करो 

// PS C:\Users\Dell\Downloads\Project\Back End Project\Chat App\backend> npx nodemon index.js
// [nodemon] 3.1.10
// [nodemon] to restart at any time, enter `rs`
// [nodemon] watching path(s): *.*     
// [nodemon] watching extensi ons: js,mjs,cjs,json
// [nodemon] starting `node index.js`  
// server running



// ये src folder मे है 
// kyuki वही workflow frontend मे भी है 