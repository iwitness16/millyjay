import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Unavailable',
  robots: 'noindex, nofollow',
};

export default function ShutdownPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          background: #f5f5f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          min-height: 100vh;
          color: #1a1a1a;
        }

        #chat-widget-container,
        #smartsupp-widget-container,
        [id^="smartsupp"],
        #whatsapp-widget { display: none !important; }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background: #f5f5f5;
        }

        .card {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-top: 4px solid #d32f2f;
          border-radius: 6px;
          padding: clamp(32px, 6vw, 52px) clamp(24px, 6vw, 52px);
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        }

        .icon {
          font-size: 48px;
          margin-bottom: 20px;
          display: block;
        }

        .status-badge {
          display: inline-block;
          background: #fdecea;
          color: #c62828;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 20px;
          border: 1px solid #f5c6c6;
        }

        h1 {
          font-size: clamp(20px, 4vw, 26px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .divider {
          height: 1px;
          background: #eeeeee;
          margin: 22px 0;
        }

        p {
          font-size: clamp(14px, 2.5vw, 15px);
          color: #555;
          line-height: 1.75;
        }

        p + p { margin-top: 12px; }

        .ref {
          margin-top: 28px;
          font-size: 11px;
          color: #aaa;
          letter-spacing: 0.5px;
        }

        .footer {
          margin-top: 28px;
          font-size: 12px;
          color: #aaa;
          text-align: center;
        }
      `}</style>

      <div className="page">
        <div className="card">
          <span className="icon">🚫</span>
          <div className="status-badge">Site Unavailable</div>

          <h1>This website has been taken down</h1>

          <div className="divider" />

          <p>
            This website has received a significant number of reports from users
            claiming to have been scammed. As a result, it has been taken offline
            pending a full review.
          </p>
          <p>
            If you have made a payment or shared personal information with this site,
            we strongly advise you to contact your bank or payment provider immediately
            to dispute the transaction and protect your account.
          </p>

          <div className="ref">Reference ID: RPT-2026-09-0047182</div>
        </div>

        <div className="footer">
          &copy; {new Date().getFullYear()} &nbsp;·&nbsp; Consumer Protection Notice
        </div>
      </div>
    </>
  );
}
