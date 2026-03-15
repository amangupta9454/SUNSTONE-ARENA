import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { getClassAnalytics, getStudentAnalytics, exportStudentReport, createAssignment } from '../services/api'
import AssignTopicModal from '../components/Teacher/AssignTopicModal'

function generatePDFContent(report) {
  const { student, summary, mastery_breakdown } = report
  const rows = mastery_breakdown.map((m) =>
    `<tr><td>${m.skill_name}</td><td>${m.subject}</td><td>${m.mastery_score}%</td><td>${m.status}</td></tr>`
  ).join('')
  return `
    <html><head><style>
      body{font-family:Arial,sans-serif;padding:24px;color:#111}
      h1{color:#4F46E5}table{width:100%;border-collapse:collapse;margin-top:16px}
      th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f4f6}
      .stat{display:inline-block;margin:8px 16px 8px 0}
    </style></head><body>
      <h1>EduPath AI — Student Progress Report</h1>
      <p><strong>Name:</strong> ${student.name} | <strong>Email:</strong> ${student.email}</p>
      <p><strong>Career Goal:</strong> ${student.career_goal} | <strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
      <div>
        <span class="stat">📊 Avg Mastery: <strong>${summary.avg_mastery}%</strong></span>
        <span class="stat">✅ Mastered: <strong>${summary.skills_mastered}</strong></span>
        <span class="stat">🎯 Accuracy: <strong>${summary.accuracy}%</strong></span>
        <span class="stat">📝 Attempts: <strong>${summary.total_attempts}</strong></span>
      </div>
      <table><thead><tr><th>Skill</th><th>Subject</th><th>Mastery</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody></table>
    </body></html>`
}

export default function TeacherDashboard() {
  const [classData, setClassData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedStudent, setExpandedStudent] = useState(null)
  const [studentDetail, setStudentDetail] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [assignModal, setAssignModal] = useState(null) // { student_id, name }
  const [exportingId, setExportingId] = useState(null)

  useEffect(() => {
    getClassAnalytics()
      .then(({ data }) => setClassData(data))
      .catch(() => toast.error('Failed to load class analytics'))
      .finally(() => setLoading(false))
  }, [])

  const handleViewStudent = async (studentId) => {
    if (expandedStudent === studentId) { setExpandedStudent(null); setStudentDetail(null); return }
    setExpandedStudent(studentId)
    setLoadingDetail(true)
    try {
      const { data } = await getStudentAnalytics(studentId)
      setStudentDetail(data)
    } catch { toast.error('Failed to load student details') }
    finally { setLoadingDetail(false) }
  }

  const handleExport = async (studentId) => {
    setExportingId(studentId)
    try {
      const { data } = await exportStudentReport(studentId)
      const html = generatePDFContent(data.report)
      const win = window.open('', '_blank')
      win.document.write(html)
      win.document.close()
      win.print()
    } catch { toast.error('Failed to export report') }
    finally { setExportingId(null) }
  }

  const handleAssign = async ({ skill_id, message, due_date }) => {
    try {
      await createAssignment({ student_id: assignModal.student_id, skill_id, message, due_date })
      toast.success(`Topic assigned to ${assignModal.name}!`)
      setAssignModal(null)
    } catch { toast.error('Failed to assign topic') }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  const skills = classData?.skill_averages || []
  const students = classData?.students || []
  const avgClassMastery = students.length > 0
    ? Math.round((students.reduce((s, st) => s + st.average_mastery, 0) / students.length) * 100) : 0
  const worstSkill = [...skills].sort((a, b) => a.average_mastery - b.average_mastery)[0]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">👩‍🏫 Teacher Dashboard</h1>
        <p className="text-gray-400 mt-1">Class overview and student analytics</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: students.length, color: 'text-primary' },
          { label: 'Avg Class Mastery', value: `${avgClassMastery}%`, color: 'text-secondary' },
          { label: 'Most Struggled', value: worstSkill?.skill_name || '—', color: 'text-danger', small: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card text-center">
            <div className={`${s.small ? 'text-lg' : 'text-3xl'} font-bold ${s.color} truncate`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Student table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="card">
        <h2 className="font-bold text-white mb-4">Students</h2>
        {students.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No students enrolled yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Email', 'Avg Mastery', 'Skills', 'Actions'].map((h) => (
                    <th key={h} className="text-left py-3 px-4 font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <>
                    <tr key={student.student_id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-4 font-medium text-white">{student.name}</td>
                      <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{student.email}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${student.average_mastery >= 0.7 ? 'badge-success' : student.average_mastery >= 0.4 ? 'badge-warning' : 'badge-danger'}`}>
                          {Math.round(student.average_mastery * 100)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{student.skills_tracked}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleViewStudent(student.student_id)} className="text-primary text-xs font-medium hover:underline">
                            {expandedStudent === student.student_id ? 'Hide ▲' : 'View ▼'}
                          </button>
                          <button onClick={() => setAssignModal({ student_id: student.student_id, name: student.name })} className="text-accent text-xs font-medium hover:underline">
                            Assign
                          </button>
                          <button
                            onClick={() => handleExport(student.student_id)}
                            disabled={exportingId === student.student_id}
                            className="text-secondary text-xs font-medium hover:underline disabled:opacity-50"
                          >
                            {exportingId === student.student_id ? '...' : 'PDF'}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedStudent === student.student_id && (
                      <tr key={`${student.student_id}-detail`}>
                        <td colSpan={5} className="bg-dark-700 px-6 py-4">
                          {loadingDetail ? (
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                              Loading...
                            </div>
                          ) : studentDetail ? (
                            <div className="space-y-3">
                              <div className="flex gap-4 text-sm text-gray-400">
                                <span>Accuracy: <strong className="text-white">{studentDetail.stats?.accuracy_percentage}%</strong></span>
                                <span>Mastered: <strong className="text-white">{studentDetail.stats?.skills_mastered} skills</strong></span>
                                <span>Career: <strong className="text-white capitalize">{studentDetail.student?.career_goal || '—'}</strong></span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {studentDetail.mastery_breakdown?.map((m) => (
                                  <div key={m.skill_id} className="bg-dark-800 rounded-lg p-3 border border-white/5">
                                    <p className="text-xs font-medium text-gray-300 truncate">{m.skill_name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex-1 progress-bar">
                                        <div className="progress-fill" style={{ width: `${Math.round(m.mastery_score * 100)}%`, background: m.mastery_score >= 0.7 ? '#10B981' : m.mastery_score >= 0.4 ? '#F59E0B' : '#EF4444' }} />
                                      </div>
                                      <span className="text-xs text-gray-400">{Math.round(m.mastery_score * 100)}%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Assign Topic Modal */}
      <AnimatePresence>
        {assignModal && (
          <AssignTopicModal
            studentName={assignModal.name}
            onAssign={handleAssign}
            onClose={() => setAssignModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
