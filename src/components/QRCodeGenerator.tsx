import { useState, useEffect, useRef } from "react";
import { Download, QrCode, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  token: string;
  bienNom: string;
}

const sizes = [
  { label: "3×3 cm (étiquette)", value: 150 },
  { label: "5×5 cm (standard)", value: 250 },
  { label: "10×10 cm (affiche)", value: 500 },
];

const QRCodeGenerator = ({ token, bienNom }: QRCodeGeneratorProps) => {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState(250);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const url = `https://safetrace.ci/scan/${token}`;

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: { dark: "#1B3A6B", light: "#FFFFFF" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl);
  }, [url, size]);

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.download = `SafeTrace-${token}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const downloadPDF = async () => {
    // Create a simple PDF with canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const pdfWidth = size + 60;
    const pdfHeight = size + 120;
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, pdfWidth, pdfHeight);

    // Title
    ctx.fillStyle = "#1B3A6B";
    ctx.font = "bold 14px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SafeTrace CI", pdfWidth / 2, 24);

    // QR Code image
    const img = new Image();
    img.src = qrDataUrl;
    await new Promise((r) => { img.onload = r; });
    ctx.drawImage(img, 30, 36, size, size);

    // Footer
    ctx.fillStyle = "#6B7280";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText(`Vérifier sur safetrace.ci`, pdfWidth / 2, size + 60);
    ctx.fillText(bienNom, pdfWidth / 2, size + 78);
    ctx.font = "8px Inter, sans-serif";
    ctx.fillText(token, pdfWidth / 2, size + 94);

    // Download as image (PDF-like)
    const link = document.createElement("a");
    link.download = `SafeTrace-${token}-etiquette.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Card className="border-2 border-safe-green/30">
      <CardHeader className="text-center pb-2">
        <div className="w-12 h-12 rounded-xl bg-safe-green/10 flex items-center justify-center mx-auto mb-2">
          <QrCode className="h-6 w-6 text-safe-green" />
        </div>
        <CardTitle className="font-display text-lg">QR Code généré</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {qrDataUrl && (
          <div className="flex justify-center">
            <div className="bg-card border-2 rounded-xl p-4 inline-block">
              <img src={qrDataUrl} alt="QR Code SafeTrace" className="mx-auto" style={{ width: Math.min(size, 200) }} />
              <p className="text-center text-xs text-muted-foreground mt-2">safetrace.ci/scan/{token.slice(0, 12)}…</p>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Format d'impression</label>
          <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s.value} value={String(s.value)}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={downloadPNG} className="w-full">
            <Download className="h-4 w-4 mr-1" />
            PNG
          </Button>
          <Button variant="outline" onClick={downloadPDF} className="w-full">
            <FileText className="h-4 w-4 mr-1" />
            Étiquette
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Collez ce QR code sur votre bien. Tout scan notifiera votre compte.
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
