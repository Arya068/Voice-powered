import { jsPDF } from "jspdf"

function DownloadButton({ tasks }) {

  const downloadTxt = () => {
    if (tasks.length === 0) { alert("No tasks to download!"); return }
    let content = "VoiceDo - Task List\n"
    content += "====================\n\n"
    tasks.forEach((task, index) => {
      content += `${index + 1}. ${task.text} ${task.done ? "✅" : "⬜"}\n`
    })
    const blob = new Blob([content], { type: "text/plain" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "voicedo-tasks.txt"
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const downloadCsv = () => {
    if (tasks.length === 0) { alert("No tasks to download!"); return }
    let content = "No.,Task,Status\n"
    tasks.forEach((task, index) => {
       content += `${index + 1},"${task.text}","${task.done ? "✅" : "⬜"}"\n`
    })
    const blob = new Blob([content], { type: "text/csv" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "voicedo-tasks.csv"
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const downloadPdf = () => {
    if (tasks.length === 0) { alert("No tasks to download!"); return }
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("VoiceDo - Task List", 10, 10)
    doc.setFontSize(12)
    tasks.forEach((task, index) => {
      doc.text(
        `${index + 1}. ${task.text} ${task.done ? "[Done]" : "[Pending]"}`,
        10,
        25 + index * 10
      )
    })
    doc.save("voicedo-tasks.pdf")
  }

  return (
    <div className="flex justify-center gap-3 mt-10 mb-6">
      <button
        onClick={downloadTxt}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl shadow transition-all duration-300"
      >
        ⬇ TXT
      </button>
      <button
        onClick={downloadCsv}
        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-xl shadow transition-all duration-300"
      >
        ⬇ CSV
      </button>
      <button
        onClick={downloadPdf}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl shadow transition-all duration-300"
      >
        ⬇ PDF
      </button>
    </div>
  )
}

export default DownloadButton