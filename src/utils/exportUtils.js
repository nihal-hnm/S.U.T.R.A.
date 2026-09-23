/**
 * S.U.T.R.A. Export & Clipboard Utilities
 */

export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

export function downloadAsText(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadAsJSON(filename, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printElement(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>S.U.T.R.A. Official Document Print</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; padding: 40px; color: #000; line-height: 1.6; }
          .advisory-doc-container { max-width: 800px; margin: 0 auto; }
          .advisory-header-mast { text-align: center; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 20px; }
          .advisory-org-title { font-size: 18pt; font-weight: bold; }
          .advisory-ref-bar { display: flex; justify-content: space-between; margin-top: 12px; font-size: 10pt; font-family: monospace; }
          .advisory-title-banner { text-align: center; font-weight: bold; font-size: 14pt; margin: 20px 0; background: #eee; padding: 6px; }
          .advisory-section { margin-bottom: 16px; font-size: 11pt; }
          .advisory-sec-heading { font-weight: bold; margin-bottom: 4px; border-bottom: 1px dotted #ccc; }
          .advisory-alert-callout { border: 2px solid #333; padding: 10px; margin: 12px 0; font-weight: bold; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${element.innerHTML}
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
