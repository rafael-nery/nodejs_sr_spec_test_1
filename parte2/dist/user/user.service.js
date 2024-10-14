"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const Sentry = require("@sentry/node");
const logger_service_1 = require("../common/logger/logger.service");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new logger_service_1.AppLogger();
    }
    async create(createUserDto) {
        try {
            this.logger.log('Criando um novo usuário');
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const createdUser = new this.userModel({
                ...createUserDto,
                password: hashedPassword
            });
            return createdUser.save();
        }
        catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    }
    async findAll() {
        try {
            this.logger.log('Listando todos os usuários');
            return this.userModel.find().exec();
        }
        catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    }
    async findOne(username) {
        try {
            this.logger.log(`Buscando usuário com username: ${username}`);
            return this.userModel.findOne({ username }).exec();
        }
        catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    }
    async update(id, updateUserDto) {
        try {
            this.logger.log(`Atualizando usuário com ID: ${id}`);
            const updateData = { ...updateUserDto };
            if (updateUserDto.password) {
                updateData.password = await bcrypt.hash(updateUserDto.password, 10);
            }
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
            if (!updatedUser) {
                this.logger.error(`Usuário com ID ${id} não encontrado`, 'UserService');
                throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
            }
            return updatedUser;
        }
        catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Removendo usuário com ID: ${id}`);
            const result = await this.userModel.findByIdAndDelete(id).exec();
            if (!result) {
                this.logger.error(`Usuário com ID ${id} não encontrado`, 'UserService');
                throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
            }
        }
        catch (error) {
            Sentry.captureException(error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map