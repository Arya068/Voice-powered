// import { useState, useEffect, useRef } from "react"
// import MicButton from "./components/MicButton"
// import TaskList from "./components/TaskList"
// import DownloadButton from "./components/DownloadButton"

// function App() {
//   const [tasks, setTasks] = useState([])
//   const [listening, setListening] = useState(false)
//   const [inputText, setInputText] = useState("")
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRec) {
//       alert("Your browser does not support Speech Recognition. Please use Chrome.")
//       return
//     }
//     const recognition = new SpeechRec()
//     recognition.continuous = false
//     recognition.interimResults = false
//     recognition.lang = "en-US"

//     recognition.onresult = (e) => {
//       const transcript = e.results[0][0].transcript
//       addTask(transcript, "voice")
//       recognition.stop()
//     }

//     recognition.onend = () => setListening(false)
//     recognition.onerror = () => setListening(false)

//     recognitionRef.current = recognition
//   }, [])

//   const addTask = (text, source = "typed") => {
//     if (!text.trim()) return
//     setTasks((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         text: text.trim(),
//         done: false,
//         source,
//       },
//     ])
//   }

//   const toggleMic = () => {
//     if (listening) {
//       recognitionRef.current.stop()
//       setListening(false)
//     } else {
//       recognitionRef.current.start()
//       setListening(true)
//     }
//   }

//   const handleToggle = (id) => {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
//     )
//   }

//   const handleDelete = (id) => {
//     setTasks((prev) => prev.filter((t) => t.id !== id))
//   }

//   const handleAdd = () => {
//     addTask(inputText)
//     setInputText("")
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-2">
//           🎙 VoiceDo
//         </h1>
//         <p className="text-center text-gray-400 text-sm mb-8">
//           Speak or type your tasks
//         </p>

//         <MicButton listening={listening} onClick={toggleMic} />

//         <div className="flex gap-2 mt-6">
//           <input
//             type="text"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleAdd()}
//             placeholder="Or type a task here..."
//             className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-400"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
//             ><span className="text-lg font-bold">+</span>
//           </button>
//         </div>

//         <TaskList
//           tasks={tasks}
//           onToggle={handleToggle}
//           onDelete={handleDelete}
//         />

//         <DownloadButton tasks={tasks} />
//       </div>
//     </div>
//   )
// }

// export default App

import { useState, useEffect, useRef } from "react"
import MicButton from "./components/MicButton"
import TaskList from "./components/TaskList"
import DownloadButton from "./components/DownloadButton"

function App() {
  const [tasks, setTasks] = useState([])
  const [listening, setListening] = useState(false)
  const [inputText, setInputText] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const recognitionRef = useRef(null)
  const hasAddedRef = useRef(false)

   useEffect(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRec) {
      alert("Your browser does not support Speech Recognition. Please use Chrome.")
      return
    }
    const recognition = new SpeechRec()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    let finalTranscript = ""

    recognition.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript + " "
        }
      }
    }

    recognition.onend = () => {
      setListening(false)
      if (finalTranscript.trim()) {
        addTask(finalTranscript.trim(), "voice")
        finalTranscript = ""
      }
    }

    recognition.onerror = () => {
      setListening(false)
      finalTranscript = ""
    }

    recognitionRef.current = recognition
  }, [])

  const addTask = (text, source = "typed") => {
    if (!text.trim()) return
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        done: false,
        source,
      },
    ])
  }

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
    }
  }

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleAdd = () => {
    addTask(inputText)
    setInputText("")
  }

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 style={{ backgroundColor: '#F5F2E8' }} ${darkMode ? "bg-gray-900" : "bg-white"}`}> 
      <div className="w-full max-w-md">
       <div className="relative flex justify-center items-center mb-2 w-full text-center w-full">
          <h1 className="text-4xl font-extrabold text-emerald-400">
          🎙 VoiceDo
          </h1>
          <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-0 text-2xl"
          title="Toggle Dark/Light Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
                
        <p className={`text-center text-sm mb-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Speak or type your tasks
        </p>

         <MicButton listening={listening} onClick={toggleMic} />

        <div className="flex gap-2 mt-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Or type a task here..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-400"
          />
          <button
            onClick={handleAdd}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
        <DownloadButton tasks={tasks} />
      </div>
    </div>
  )
}

export default App