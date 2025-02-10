// /src/app/api/query.js
import { NextResponse } from 'next/server';
import { ColorArea } from 'react-aria-components';
import axios from 'axios';
export async function POST(request) {
  try {
    const { prompt } = await request.json();  // Get data from the request body
    const query = {
        "prompt": prompt
    }
    console.log(query)
    console.log(typeof query)
    const res = await axios.post('http://localhost:5001/process', query)


    // console.log(res)
    // Call the Flask API
    // const response = await fetch('http://localhost:5001/process', {
    //   method: 'POST',
    // //   headers: {
    // //     'Content-Type': 'application/json',
    // //   },
    //   body: prompt,
    // });


    // const result = await response.json();

    // // Check if the Flask API returned an error
    // if (response.ok) {
    //   return NextResponse.json(result);
    // } else {
    //   return NextResponse.json({ error: result.error || 'Something went wrong' }, { status: 500 });
    // }
    return NextResponse.json(res.data)

  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
