/**
 * Define datasource for TypeORM.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from '../config/configuration';

export const dbdatasource: DataSourceOptions & SeederOptions = <DataSourceOptions & SeederOptions>(config.typeOrm);

const dataSource = new DataSource(dbdatasource)
export default dataSource