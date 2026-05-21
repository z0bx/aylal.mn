// /server/seeds/seedDatabase.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

dotenv.config();

const seedData = async () => {
  try {
    // MongoDB холболт
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aylal-mn");
    console.log("Database connected for seeding...");

    // Хуучин өгөгдлийг цэвэрлэх
    await User.deleteMany();
    await Tour.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    // 1. Админ хэрэглэгч үүсгэх
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      phone: "+976-99112233",
      role: "admin"
    });
    console.log("✅ Admin user seeded.");

    // 2. Жинхэнэ аяллын өгөгдлүүд (Админы ID-г дуудаж оруулсан)
    const sampleTours = [
      {
        title: "Хөвсгөл нуурын байгалийн гайхамшиг",
        description: "Монголын хөх сувд Хөвсгөл нуурын эрэгт амарч, цаатан ардын ахуй амьдралтай танилцах мартагдашгүй аялал.",
        price: 3200000,
        duration: 5,
        location: "Хөвсгөл аймаг",
        maxCapacity: 15,
        image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
        createdBy: adminUser._id, // Жинхэнэ админы ID-г холбов
        daysItinerary: [
          { day: 1, title: "Улаанбаатараас Мөрөн рүү хөдлөх", description: "Мөрөн хотод очиж, Хөвсгөл нуур руу чиглэнэ.", activities: ["Нислэг эсвэл Машин", "Зааварчилгаа"] },
          { day: 2, title: "Хөх сувд нуурын эрэг дээр", description: "Завьтай аялал хийж, байгалийн сайхныг тольдох.", activities: ["Завь", "Явган аялал"] }
        ]
      },
      {
        title: "Говийн наран: Хонгорын элс, Баянзаг",
        description: "Үлэг гүрвэлийн өлгий нутаг Баянзаг болон дуулдаг элс хэмээх Хонгорын элсээр аялах адал явдалт аялал.",
        price: 4500000,
        duration: 7,
        location: "Өмнөговь аймаг",
        maxCapacity: 12,
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
        createdBy: adminUser._id, // Жинхэнэ админы ID-г холбов
        daysItinerary: [
          { day: 1, title: "Ёлын ам зорих", description: "Мөнх мөстэй Ёлын амны хавцлаар алхах.", activities: ["Аялал", "Гэр баазад байрлах"] }
        ]
      },
      {
        title: "Алтай Таван Богд: Мөсөн голын аялал",
        description: "Монгол орны хамгийн өндөр цэг Алтай Таван Богдын сүрлэг уулс, Потанины мөсөн голоор алхах тусгай аялал.",
        price: 5800000,
        duration: 9,
        location: "Баян-Өлгий аймаг",
        maxCapacity: 10,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        createdBy: adminUser._id, // Жинхэнэ админы ID-г холбов
        daysItinerary: [
          { day: 1, title: "Өлгий хотод газардах", description: "Бааз руу шилжиж, авиралтын бэлтгэл хангах.", activities: ["Багийн уулзалт"] }
        ]
      }
    ];

    await Tour.insertMany(sampleTours);
    console.log("✅ Sample tours seeded successfully.");

    mongoose.connection.close();
    console.log("Seeding complete. Connection closed.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();