/* tslint:disable max-classes-per-file */
import { DataItem, MethodAbi } from 'ethereum-types';
import * as _ from 'lodash';

import { DataType } from './abstract_data_types/data_type';
import { DataTypeFactory } from './abstract_data_types/interfaces';
import { AddressDataType } from './evm_data_types/address';
import { ArrayDataType } from './evm_data_types/array';
import { BoolDataType } from './evm_data_types/bool';
import { DynamicBytesDataType } from './evm_data_types/dynamic_bytes';
import { IntDataType } from './evm_data_types/int';
import { MethodDataType } from './evm_data_types/method';
import { PointerDataType } from './evm_data_types/pointer';
import { StaticBytesDataType } from './evm_data_types/static_bytes';
import { StringDataType } from './evm_data_types/string';
import { TupleDataType } from './evm_data_types/tuple';
import { UIntDataType } from './evm_data_types/uint';

export class Address extends AddressDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class Bool extends BoolDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class Int extends IntDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class UInt extends UIntDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class StaticBytes extends StaticBytesDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class DynamicBytes extends DynamicBytesDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class String extends StringDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class Pointer extends PointerDataType {
    public constructor(destDataType: DataType, parentDataType: DataType) {
        super(destDataType, parentDataType, EvmDataTypeFactory.getInstance());
    }
}

export class Tuple extends TupleDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class Array extends ArrayDataType {
    public constructor(dataItem: DataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}

export class Method extends MethodDataType {
    public constructor(abi: MethodAbi) {
        super(abi, EvmDataTypeFactory.getInstance());
    }
}

/* tslint:disable no-construct */
export class EvmDataTypeFactory implements DataTypeFactory {
    private static _instance: DataTypeFactory;

    public static getInstance(): DataTypeFactory {
        if (!EvmDataTypeFactory._instance) {
            EvmDataTypeFactory._instance = new EvmDataTypeFactory();
        }
        return EvmDataTypeFactory._instance;
    }

    /* tslint:disable prefer-function-over-method */
    public create(dataItem: DataItem, parentDataType?: DataType): DataType {
        // Create data type
        let dataType: undefined | DataType;
        if (Array.matchType(dataItem.type)) {
            dataType = new Array(dataItem);
        } else if (Address.matchType(dataItem.type)) {
            dataType = new Address(dataItem);
        } else if (Bool.matchType(dataItem.type)) {
            dataType = new Bool(dataItem);
        } else if (Int.matchType(dataItem.type)) {
            dataType = new Int(dataItem);
        } else if (UInt.matchType(dataItem.type)) {
            dataType = new UInt(dataItem);
        } else if (StaticBytes.matchType(dataItem.type)) {
            dataType = new StaticBytes(dataItem);
        } else if (Tuple.matchType(dataItem.type)) {
            dataType = new Tuple(dataItem);
        } else if (DynamicBytes.matchType(dataItem.type)) {
            dataType = new DynamicBytes(dataItem);
        } else if (String.matchType(dataItem.type)) {
            dataType = new String(dataItem);
        }
        // @TODO: DataTypeement Fixed/UFixed types
        if (_.isUndefined(dataType)) {
            throw new Error(`Unrecognized data type: '${dataItem.type}'`);
        } else if (!_.isUndefined(parentDataType) && !dataType.isStatic()) {
            const pointerToDataType = new Pointer(dataType, parentDataType);
            return pointerToDataType;
        }
        return dataType;
    }
    /* tslint:enable prefer-function-over-method */

    private constructor() {}
}
/* tslint:enable no-construct */
