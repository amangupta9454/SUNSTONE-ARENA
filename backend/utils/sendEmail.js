const nodemailer = require('nodemailer');

/**
 * Reusable email sender using Nodemailer SMTP.
 * Configure SMTP credentials in .env:
 *   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM
 */

// Create transporter once (reused across calls)
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/**
 * Send a generic email.
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 */
const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email not configured — skipping email send. Set EMAIL_USER and EMAIL_PASS in .env');
    return { skipped: true };
  }

  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"EduPath AI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log(`📧 Email sent to ${to}: ${info.messageId}`);
  return info;
};

// ─── Email Templates ──────────────────────────────────────────────────────────

/**
 * Quiz completed notification email.
 */
const sendQuizCompletedEmail = async ({ to, userName, examName, score, total, accuracy, nextTopic }) => {
  const html = `
    <div style="font-family: Inter, sans-serif; background: #050B18; color: #fff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #6366F1; font-size: 28px; margin: 0;">EduPath AI</h1>
        <p style="color: #9CA3AF; margin: 4px 0;">Your Learning Journey</p>
      </div>
      <div style="background: #0A1628; border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 24px; margin-bottom: 16px;">
        <h2 style="color: #fff; margin-top: 0;">Quiz Completed! 🎉</h2>
        <p style="color: #D1D5DB;">Hi <strong>${userName}</strong>, you just completed <strong>${examName}</strong>.</p>
        <div style="display: flex; gap: 16px; margin: 20px 0; flex-wrap: wrap;">
          <div style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 16px; flex: 1; min-width: 120px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #6366F1;">${score}/${total}</div>
            <div style="color: #9CA3AF; font-size: 12px;">Score</div>
          </div>
          <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 16px; flex: 1; min-width: 120px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #10B981;">${accuracy}%</div>
            <div style="color: #9CA3AF; font-size: 12px;">Accuracy</div>
          </div>
        </div>
        ${nextTopic ? `<p style="color: #D1D5DB;">📚 Next recommended topic: <strong style="color: #6366F1;">${nextTopic}</strong></p>` : ''}
      </div>
      <p style="color: #6B7280; font-size: 12px; text-align: center;">Keep up the great work! Log in to EduPath AI to continue your learning journey.</p>
    </div>
  `;
  return sendEmail({ to, subject: `Quiz Completed: ${examName} — ${accuracy}% Accuracy`, html });
};

/**
 * Streak milestone email.
 */
const sendStreakMilestoneEmail = async ({ to, userName, streak }) => {
  const html = `
    <div style="font-family: Inter, sans-serif; background: #050B18; color: #fff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #6366F1; font-size: 28px; margin: 0;">EduPath AI</h1>
      </div>
      <div style="background: #0A1628; border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; padding: 24px; text-align: center;">
        <div style="font-size: 64px;">🔥</div>
        <h2 style="color: #F59E0B; margin: 8px 0;">${streak}-Day Streak!</h2>
        <p style="color: #D1D5DB;">Amazing, <strong>${userName}</strong>! You've studied for <strong>${streak} consecutive days</strong>. Keep the momentum going!</p>
      </div>
    </div>
  `;
  return sendEmail({ to, subject: `🔥 ${streak}-Day Study Streak Milestone!`, html });
};

/**
 * Weekly study summary email.
 */
const sendWeeklySummaryEmail = async ({ to, userName, sessions, avgAccuracy, totalXP }) => {
  const html = `
    <div style="font-family: Inter, sans-serif; background: #050B18; color: #fff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #6366F1; font-size: 28px; margin: 0;">EduPath AI</h1>
        <p style="color: #9CA3AF;">Weekly Study Summary</p>
      </div>
      <div style="background: #0A1628; border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 24px;">
        <h2 style="color: #fff; margin-top: 0;">Your Week in Review, ${userName} 📊</h2>
        <p style="color: #D1D5DB;">Sessions completed: <strong style="color: #6366F1;">${sessions}</strong></p>
        <p style="color: #D1D5DB;">Average accuracy: <strong style="color: #10B981;">${avgAccuracy}%</strong></p>
        <p style="color: #D1D5DB;">XP earned this week: <strong style="color: #F59E0B;">+${totalXP} XP</strong></p>
      </div>
    </div>
  `;
  return sendEmail({ to, subject: `Your Weekly EduPath AI Summary`, html });
};

/**
 * Risk alert email for high-risk students.
 */
const sendRiskAlertEmail = async ({ to, userName, riskScore, interventions }) => {
  const tips = interventions.map((t) => `<li style="color:#D1D5DB;margin:4px 0;">${t}</li>`).join('');
  const html = `
    <div style="font-family:Inter,sans-serif;background:#050B18;color:#fff;padding:32px;border-radius:12px;max-width:600px;margin:0 auto;">
      <h1 style="color:#6366F1;font-size:24px;margin:0 0 8px;">EduPath AI</h1>
      <div style="background:#0A1628;border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:24px;">
        <h2 style="color:#EF4444;margin-top:0;">⚠️ Study Alert for ${userName}</h2>
        <p style="color:#D1D5DB;">Your current risk score is <strong style="color:#EF4444;">${riskScore}%</strong>. Here are some steps to get back on track:</p>
        <ul style="padding-left:20px;">${tips}</ul>
        <p style="color:#9CA3AF;font-size:12px;margin-top:16px;">Log in to EduPath AI to continue your learning journey.</p>
      </div>
    </div>`;
  return sendEmail({ to, subject: `⚠️ EduPath AI: Study Alert — Action Recommended`, html });
};

module.exports = { sendEmail, sendQuizCompletedEmail, sendStreakMilestoneEmail, sendWeeklySummaryEmail, sendRiskAlertEmail };
