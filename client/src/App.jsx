// import React, { useState, useEffect } from 'react'; // Correct imports
// import './App.css';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// function App() {
//   const [image, setImage] = useState(null);
//   const [value, setValue] = useState('');
//   const [error, setError] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [markdownContent, setMarkdownContent] = useState('');

//   const uploadImage = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', image);

//       const response = await axios.post('http://localhost:4040/upload', formData);
//       alert(response?.data?.message);
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//     }
//   };

//   useEffect(() => {
//     if (image) {
//       uploadImage();
//     }
//   }, [image]);

//   const analyzeImage = async () => {
//     try {
//         setLoading(true);
//         setError('');
//         setResponse('');
//         setMarkdownContent('');
        
//         if (!image && value.length <= 5) {
//             setError('Add more characters to ask your question');
//             setLoading(false);
//             return;
//         }

//         const response = await fetch('http://localhost:4040/gemini/text', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message: value }),
//         });

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();

//         let accumulatedResponse = '';
        
//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;

//             const chunkText = decoder.decode(value, { stream: true });
//             accumulatedResponse += chunkText;
            
//             setResponse((prev) => prev + chunkText);
//             setMarkdownContent(accumulatedResponse);
//         }
        
//         setLoading(false);
//     } catch (err) {
//         console.error(err);
//         setError('Something went wrong');
//         setLoading(false);
//     }
// };



//   const clear = () => {
//     setError('');
//     setResponse('');
//     setValue('');
//     setImage(null);
//   };

//   return (
//     <div className='theApp'>
//       <header className='theHead'>
//         <h1>Davids AI</h1>
//       </header>
//       <main className='theMain'>
//         <div className='theContents'>
//           {image && (
//             <img src={URL.createObjectURL(image)} alt="uploaded preview" style={{ width: 200, height: 200 }} />
//           )}

//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             id='files'
//             accept='image/*'
//             type='file'
//             hidden
//           />

//           <div>
//             {error && <p>{error}</p>}
//             {response && <ReactMarkdown>{markdownContent}</ReactMarkdown>}

//             <div className='theActions'>
//               <textarea
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 placeholder='Ask a question...'
//                 className='theInput'
//               />

//               {(!response && !error) && (
//                 <button onClick={analyzeImage} disabled={loading}>
//                   {loading ? 'Loading...' : 'Ask'}
//                 </button>
//               )}

//               <button onClick={clear}>Clear</button>
//               <label htmlFor='files' className='theLabel'>
//                 Upload
//               </label>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
