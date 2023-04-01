import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/dbConfig';


interface FileAttributes {
  id: number;
  fileName: string;
  fileSize: string;
  uploadDate: Date;
  
}

export interface FileInput extends Optional<FileAttributes, 'id' > {}

class File extends Model<FileAttributes, FileInput> implements FileAttributes {
    public id!: number
    public fileName!: string
    public fileSize!: string
    public uploadDate!: Date

  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  File.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
})

export default File