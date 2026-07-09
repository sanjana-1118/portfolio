export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const submitContact = async (data: ContactData) => {
  console.log('Contact form submitted with data:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Message sent successfully!' });
    }, 1000);
  });
};
