"use strict";
import dotenv from "dotenv";
import initModels from "./init-models.js";

dotenv.config();

export const {Appointment, AppointmentMaterial, Lab, Material, User, StockEntry} =
    initModels(sequelize);

