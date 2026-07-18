import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  type: 'privacy' | 'responsibility';
  version: string;
  content: string;
  onSign: (type: 'privacy' | 'responsibility') => Promise<boolean>;
  onDecline: () => void;
}

export function SignatureModal({ type, version, content, onSign, onDecline }: Props) {
  const [accepted, setAccepted] = useState(false);
  const [signing, setSigning] = useState(false);

  const title = type === 'privacy'
    ? 'Política de Privacidad'
    : 'Declaración de Responsabilidad';

  const handleSign = async () => {
    if (!accepted) return;
    setSigning(true);
    await onSign(type);
    setSigning(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">Versión {version}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto scrollbar-thin">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            He leído y acepto el documento en su versión {version}. Otorgo mi consentimiento
            libre, informado y específico para el tratamiento de mis datos personales.
          </span>
        </label>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onDecline}
            disabled={signing}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Rechazar
          </button>
          <button
            onClick={handleSign}
            disabled={!accepted || signing}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signing ? 'Firmando...' : 'Aceptar y Firmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
