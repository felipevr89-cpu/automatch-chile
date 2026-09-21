import { useState, useEffect } from 'react';
import { PRIVACY_POLICY_CONTENT, RESPONSIBILITY_CONTENT } from '../lib/documents';

interface DocumentStatus {
  privacyPolicy: { signed: boolean; version: string };
  responsibility: { signed: boolean; version: string };
}

const STORAGE_KEY = 'autolupa_signatures';

function getStoredSignatures(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as Record<string, string[]>;
    return new Set(parsed[userId] ?? []);
  } catch {
    return new Set();
  }
}

function persistSignature(userId: string, signature: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    if (!parsed[userId]) parsed[userId] = [];
    if (!parsed[userId].includes(signature)) parsed[userId].push(signature);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // almacenamiento no disponible: la firma vive solo en memoria
  }
}

export function useDocuments(userId: string | null) {
  const [status, setStatus] = useState<DocumentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<'privacy' | 'responsibility' | null>(null);

  useEffect(() => {
    if (!userId) {
      setShowModal(null);
      setLoading(false);
      return;
    }

    const signatures = getStoredSignatures(userId);
    const privacySigned = signatures.has('privacy_policy_v1.0');
    const responsibilitySigned = signatures.has('responsibility_declaration_v1.0');

    const result: DocumentStatus = {
      privacyPolicy: { signed: privacySigned, version: '1.0' },
      responsibility: { signed: responsibilitySigned, version: '1.0' },
    };

    setStatus(result);
    setLoading(false);

    if (!result.privacyPolicy.signed) {
      setShowModal('privacy');
    } else if (!result.responsibility.signed) {
      setShowModal('responsibility');
    }
  }, [userId]);

  const sign = async (type: 'privacy' | 'responsibility') => {
    if (!userId || !status) return false;

    const docType = type === 'privacy' ? 'privacy_policy' : 'responsibility_declaration';
    const version = type === 'privacy' ? status.privacyPolicy.version : status.responsibility.version;

    persistSignature(userId, `${docType}_v${version}`);

    const signatures = getStoredSignatures(userId);
    const newStatus: DocumentStatus = {
      privacyPolicy: {
        signed: signatures.has('privacy_policy_v1.0'),
        version: '1.0',
      },
      responsibility: {
        signed: signatures.has('responsibility_declaration_v1.0'),
        version: '1.0',
      },
    };

    setStatus(newStatus);

    if (type === 'privacy' && !newStatus.responsibility.signed) {
      setShowModal('responsibility');
    } else {
      setShowModal(null);
    }

    return true;
  };

  const decline = () => {
    setShowModal(null);
  };

  const needsSignature = status
    ? !status.privacyPolicy.signed || !status.responsibility.signed
    : false;

  return {
    status,
    loading,
    showModal,
    sign,
    decline,
    needsSignature,
    privacyContent: PRIVACY_POLICY_CONTENT,
    responsibilityContent: RESPONSIBILITY_CONTENT,
  };
}