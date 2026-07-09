import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', name: 'profile.jpg' },
  { url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80', name: 'project1.jpg' },
  { url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', name: 'project2.jpg' },
  { url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80', name: 'project3.jpg' },
  { url: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=800&q=80', name: 'project4.jpg' },
  { url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', name: 'certificate1.jpg' },
  { url: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=800&q=80', name: 'certificate2.jpg' }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const run = async () => {
  for (const img of images) {
    const dest = path.join('src', 'assets', 'images', img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await downloadImage(img.url, dest);
      console.log(`Saved ${img.name}`);
    } catch (e) {
      console.error(`Error downloading ${img.name}:`, e.message);
    }
  }
};

run();
