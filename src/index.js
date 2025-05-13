import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import authRouter from './routers/auth.router.js';
import userRouter from "./routers/user.router.js";

//환경변수 관리 
dotenv.config();

//express is a web framework for Node.js
const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// ---------------------------------------------- router ----------------------------------------------

//사용하는 Router 
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})