import { certificateData } from '../data/certificates';

export interface Certificate {
  _id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  previewImageUrl: string;
  certificateImageUrl: string;
}

export const getCertificates = async (): Promise<Certificate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(certificateData);
    }, 500);
  });
};
