// Generated by dts-bundle v0.7.3

declare module 'alot' {
    
    import { Alot as AlotInner } from 'alot/alot';
    import { AlotMeta } from 'alot/AlotMeta';
    interface IAlotConstructor {
        new <T>(array: T[], meta?: AlotMeta): AlotInner<T>;
        <T>(array: T[], meta?: AlotMeta): AlotInner<T>;
        default: IAlotConstructor;
        fromObject: typeof AlotInner.fromObject;
        fromRange: typeof AlotInner.fromRange;
    }
    const alot: IAlotConstructor;
    export = alot;
}

declare module 'alot/alot' {
    
    import { AlotMeta } from 'alot/AlotMeta';
    import { AlotProto } from 'alot/AlotProto';
    import { IAlotStream, AlotStreamIterationResult } from 'alot/streams/IAlotStream';
    export class Alot<T = any> extends AlotProto<T> {
        array: T[];
        meta?: AlotMeta;
        constructor(array: T[], meta?: AlotMeta);
        static fromObject(obj: any): Alot<{
            key: string;
            value: any;
        }>;
        static fromRange(start: number, endExcluded: number): Alot<any>;
    }
    export class ArrayStream<T> implements IAlotStream<T> {
        array: T[];
        isAsync: boolean;
        constructor(array: T[]);
        next(): AlotStreamIterationResult<T>;
        nextAsync(): Promise<AlotStreamIterationResult<T>>;
        reset(): this;
    }
}

declare module 'alot/AlotMeta' {
    export interface AlotStreamOpts {
        async?: boolean;
    }
    export interface AlotMeta {
    }
    export interface AlotMetaAsync extends AlotMeta {
        threads?: number;
        errors?: 'include' | 'ignore' | 'reject';
    }
}

declare module 'alot/AlotProto' {
    import { MethodFilter } from 'alot/Methods';
    import { AlotMeta, AlotMetaAsync, AlotStreamOpts } from 'alot/AlotMeta';
    import { TAggregateNumeric } from 'alot/utils/Aggregation';
    /** Loading all stream from extra exports file to fix circular dependencies */
    import { IAlotStream, AlotStreamIterationResult, GroupByKeyFn, GroupByStream, DistinctByKeyFn, DistinctByStream, SkipStream, SkipWhileMethod, SkipWhileStream, TakeStream, TakeWhileStream, TakeWhileMethod, MapStream, MapManyStream, MethodMap, MethodMapMany, FilterStream, FilterStreamAsync, ForEachStream, ForEachMethod, SortByStream, SortByLocalCompareStream, SortMethod, JoinStream } from 'alot/streams/exports';
    import { ParametersFromSecond } from 'alot/utils/types';
    export class AlotProto<T, TSource = T> implements IAlotStream<T> {
            stream: IAlotStream<TSource>;
            isAsync: boolean;
            constructor(stream: IAlotStream<TSource>, opts?: AlotStreamOpts);
            next(): AlotStreamIterationResult<T>;
            nextAsync(): Promise<AlotStreamIterationResult<T>>;
            /**
                * Resets current stream to the beginning.
                */
            reset(): this;
            /**
                * Creates filtered stream. Is Lazy.
                * ```
                * alot(users).filter(x => x.age > 20).take(3).toArray();
                * ```
                * Filter is evaluated only N times, to match only 3 items.
                */
            filter(fn: MethodFilter<T>): FilterStream<T>;
            /**
                * Creates async filted stream. Same as filter, but accepts async methods, and returns awaitable stream.
                */
            filterAsync(fn: MethodFilter<T>): FilterStreamAsync<T>;
            map<TResult>(fn: MethodMap<T, TResult>): MapStream<T, TResult>;
            mapAsync<TResult>(fn: MethodMap<T, TResult>, meta?: AlotMeta): MapStream<T, TResult>;
            mapMany<TResult>(fn: MethodMapMany<T, TResult>): MapManyStream<T, TResult>;
            mapManyAsync<TResult>(fn: MethodMapMany<T, TResult>): MapManyStream<T, TResult>;
            forEach(fn: ForEachMethod<T>): ForEachStream<T>;
            forEachAsync<TResult>(fn: ForEachMethod<T>): ForEachStream<T>;
            take(count: number): TakeStream<T>;
            takeWhile(fn: TakeWhileMethod<T>): TakeWhileStream<T>;
            skip(count: number): SkipStream<T>;
            skipWhile(fn: SkipWhileMethod<T>): SkipWhileStream<T>;
            groupBy<TKey = string>(fn: GroupByKeyFn<T, TKey>): GroupByStream<T, TKey>;
            /** Join Left Inner  */
            join<TInner = T, TResult = T>(inner: TInner[], getKey: (x: T) => string | number, getForeignKey: (x: TInner) => string | number, joinFn: (a: T, b: TInner) => TResult): JoinStream<T, TInner, TResult>;
            /** Join Full Outer  */
            joinOuter<TInner = T, TResult = T>(inner: TInner[], getKey: (x: T) => string | number, getForeignKey: (x: TInner) => string | number, joinFn: (a?: T, b?: TInner) => TResult): JoinStream<T, TInner, TResult>;
            distinctBy(fn: DistinctByKeyFn<T>): DistinctByStream<T, string | number>;
            distinct(): DistinctByStream<T, string | number>;
            sortBy(sortByFn: SortMethod<T>, direction?: 'asc' | 'desc'): SortByStream<T>;
            sortBy(sortByKey: keyof T | string, direction?: 'asc' | 'desc'): SortByStream<T>;
            sortByLocalCompare(getValFn: (x: T, i?: number) => string, direction?: 'asc' | 'desc', ...params: ParametersFromSecond<String['localeCompare']>): SortByLocalCompareStream<T>;
            fork(fn: (stream: this) => void | any): this;
            toDictionary<TKey = string, TValue = any>(keyFn: (x: T) => TKey, valFn?: (x: T) => TValue): {
                    [key: string]: TValue;
            };
            toDictionaryAsync<TKey = string, TValue = any>(keyFn: (x: T) => Promise<TKey> | TKey, valFn?: (x: T) => Promise<TValue> | TValue): Promise<{
                    [key: string]: T;
            }>;
            toMap<TKey = string, TValue = any>(keyFn: (x: T) => TKey, valFn?: (x: T) => TValue): Map<TKey, TValue>;
            toMapAsync<TKey = string, TValue = any>(keyFn: (x: T) => Promise<TKey> | TKey, valFn?: (x: T) => Promise<TValue> | TValue): Promise<Map<TKey, TValue>>;
            toArray(): T[];
            toArrayAsync(meta?: AlotMetaAsync): PromiseLike<T[]>;
            first(matcher?: (x: T, i?: number) => boolean): T;
            firstAsync(matcher?: (x: T, i?: number) => (boolean | Promise<boolean>)): Promise<T>;
            find(matcher?: (x: T, i?: number) => boolean): T;
            findAsync(matcher?: (x: T, i?: number) => (boolean | Promise<boolean>)): Promise<T>;
            sum(getVal: (x: T, i?: number) => number, initialValue?: number): number;
            sum(getVal: (x: T, i?: number) => bigint, initialValue: bigint): bigint;
            sumAsync(getVal: (x: T, i?: number) => number | Promise<number>, initialValue?: number): Promise<number>;
            sumBigInt(getVal: (x: T, i?: number) => bigint): bigint;
            sumBigIntAsync(getVal: (x: T, i?: number) => bigint | Promise<bigint>, initialValue?: bigint): Promise<bigint>;
            max<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): TOut;
            maxAsync<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): Promise<TOut>;
            maxItem<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): T;
            maxItemAsync<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): Promise<T>;
            min<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): TOut;
            minAsync<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): Promise<TOut>;
            minItem<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): T;
            minItemAsync<TOut extends TAggregateNumeric>(fn: (x: T, i?: number) => TOut): Promise<T>;
    }
}

declare module 'alot/streams/IAlotStream' {
    export interface IAlotStream<T = any> {
        reset(): this;
        next(): AlotStreamIterationResult<T>;
        nextAsync(): Promise<AlotStreamIterationResult<T>>;
        isAsync: boolean;
    }
    export interface AlotStreamIterationResult<T> {
        value: T;
        done: boolean;
        index?: number;
    }
}

declare module 'alot/Methods' {
    export interface MethodFilter<T> {
        (x: T, i?: number): boolean | Promise<boolean>;
    }
}

declare module 'alot/utils/Aggregation' {
    import { IAlotStream } from 'alot/streams/IAlotStream';
    export type TAggregateNumeric = number | {
        valueOf: () => number;
    } | bigint;
    export namespace Aggregation {
        function getMinMaxValueBy<T, TOut>(stream: IAlotStream<T>, getFn: (x: T, i?: number) => TOut, compare: 'min' | 'max'): any;
        function getMinMaxValueByAsync<T, TOut>(stream: IAlotStream<T>, getFn: (x: T, i?: number) => TOut | Promise<TOut>, compare: 'min' | 'max'): Promise<TOut>;
        function getMinMaxItemBy<T, TOut>(stream: IAlotStream<T>, getFn: (x: T, i?: number) => TOut, compare: 'min' | 'max'): any;
        function getMinMaxItemByAsync<T, TOut>(stream: IAlotStream<T>, getFn: (x: T, i?: number) => TOut | Promise<TOut>, compare: 'min' | 'max'): Promise<T>;
        function sum<T>(stream: IAlotStream<T>, fn: (x: T, i?: number) => number, startVal: number): number;
        function sum<T>(stream: IAlotStream<T>, fn: (x: T, i?: number) => bigint, startVal: bigint): bigint;
        function sumAsync<T>(stream: IAlotStream<T>, fn: (x: T, i?: number) => number | Promise<number>, startVal: number): Promise<number>;
        function sumAsync<T>(stream: IAlotStream<T>, fn: (x: T, i?: number) => bigint | Promise<bigint>, startVal: bigint): Promise<bigint>;
    }
}

declare module 'alot/streams/exports' {
    export { IAlotStream, AlotStreamIterationResult } from 'alot/streams/IAlotStream';
    export { FilterStream, FilterStreamAsync } from 'alot/streams/FilterStream';
    export { MapStream, MapManyStream, MethodMap, MethodMapMany } from 'alot/streams/MapStream';
    export { TakeStream, TakeWhileStream, TakeWhileMethod } from 'alot/streams/TakeStream';
    export { SkipStream, SkipWhileMethod, SkipWhileStream } from 'alot/streams/SkipStream';
    export { GroupByKeyFn, GroupByStream } from 'alot/streams/GroupStream';
    export { DistinctByKeyFn, DistinctByStream } from 'alot/streams/DistinctStream';
    export { ForEachStream, ForEachMethod } from 'alot/streams/ForEachStream';
    export { ForkStreamInner, ForkStreamOuter } from 'alot/streams/ForkStream';
    export { SortByStream, SortMethod, SortByLocalCompareStream } from 'alot/streams/SortedStream';
    export { JoinStream } from 'alot/streams/JoinStream';
}

declare module 'alot/utils/types' {
    export type ParametersFromSecond<T extends (x: any, ...args: any) => any> = T extends (x: any, ...args: infer P) => any ? P : never;
}

declare module 'alot/streams/FilterStream' {
    import { AlotStreamIterationResult } from 'alot/streams/IAlotStream'; 
     import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    import { MethodFilter } from 'alot/Methods';
    import { AlotMetaAsync } from 'alot/AlotMeta';
    export class FilterStream<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            fn: MethodFilter<T>;
            constructor(stream: IAlotStream<T>, fn: MethodFilter<T>);
            next(): AlotStreamIterationResult<T>;
    }
    export class FilterStreamAsync<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            fn: MethodFilter<T>;
            isAsync: boolean;
            constructor(stream: IAlotStream<T>, fn: MethodFilter<T>);
            nextAsync(): Promise<AlotStreamIterationResult<T>>;
            reset(): this;
            toArrayAsync(meta?: AlotMetaAsync): Promise<T[]>;
    }
}

declare module 'alot/streams/MapStream' {
    import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    import { AlotStreamOpts } from 'alot/AlotMeta';
    export interface MethodMap<T, TResult> {
        (x: T, i?: number): TResult | PromiseLike<TResult>;
    }
    export class MapStream<TSource, TResult> extends AlotProto<TResult, TSource> {
        stream: IAlotStream<TSource>;
        fn: MethodMap<TSource, TResult>;
        constructor(stream: IAlotStream<TSource>, fn: MethodMap<TSource, TResult>, opts?: AlotStreamOpts);
        next(): any;
        nextAsync(): Promise<any>;
        reset(): this;
    }
    export interface MethodMapMany<T, TResult> {
        (x: T, i?: number): TResult[] | PromiseLike<TResult[]>;
    }
    export class MapManyStream<T, TResult> extends AlotProto<TResult, T> {
        stream: IAlotStream<T>;
        fn: MethodMapMany<T, TResult>;
        opts?: AlotStreamOpts;
        constructor(stream: IAlotStream<T>, fn: MethodMapMany<T, TResult>, opts?: AlotStreamOpts);
        next(): any;
        nextAsync(): any;
        reset(): this;
    }
}

declare module 'alot/streams/TakeStream' {
    import { AlotStreamIterationResult } from 'alot/streams/IAlotStream'; 
     import { IAlotStream } from 'alot/streams/IAlotStream';
    import { AlotProto } from "alot/AlotProto";
    export class TakeStream<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            _count: number;
            constructor(stream: IAlotStream<T>, _count: number);
            next(): AlotStreamIterationResult<T>;
            reset(): this;
    }
    export interface TakeWhileMethod<T> {
            (x: T): boolean;
    }
    export class TakeWhileStream<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            fn: TakeWhileMethod<T>;
            constructor(stream: IAlotStream<T>, fn: TakeWhileMethod<T>);
            next(): any;
            reset(): this;
    }
}

declare module 'alot/streams/SkipStream' {
    import { AlotStreamIterationResult } from 'alot/streams/IAlotStream'; 
     import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    export class SkipStream<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            _count: number;
            constructor(stream: IAlotStream<T>, _count: number);
            next(): AlotStreamIterationResult<T>;
            reset(): this;
    }
    export interface SkipWhileMethod<T> {
            (x: T): boolean;
    }
    export class SkipWhileStream<T> extends AlotProto<T> {
            stream: IAlotStream<T>;
            fn: SkipWhileMethod<T>;
            constructor(stream: IAlotStream<T>, fn: SkipWhileMethod<T>);
            next(): AlotStreamIterationResult<T>;
            reset(): this;
    }
}

declare module 'alot/streams/GroupStream' {
    import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    export interface GroupByKeyFn<T, TKey = string> {
        (x: T, i?: number): TKey;
    }
    interface IGroup<T, TKey = string> {
        key: TKey;
        values: T[];
    }
    export class GroupByStream<TSource, TKey = string | number> extends AlotProto<IGroup<TSource, TKey>, TSource> {
        stream: IAlotStream<TSource>;
        fn: GroupByKeyFn<TSource, TKey>;
        isAsync: boolean;
        constructor(stream: IAlotStream<TSource>, fn: GroupByKeyFn<TSource, TKey>);
        next(): any;
        reset(): this;
    }
    export {};
}

declare module 'alot/streams/DistinctStream' {
    import { AlotStreamIterationResult } from 'alot/streams/IAlotStream'; 
     import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    export interface DistinctByKeyFn<T, TKey = string | number> {
            (x: T, i?: number): TKey;
    }
    export class DistinctByStream<T, TKey = string | number> extends AlotProto<T> {
            stream: IAlotStream<T>;
            fn: DistinctByKeyFn<T, TKey>;
            constructor(stream: IAlotStream<T>, fn?: DistinctByKeyFn<T, TKey>);
            next(): AlotStreamIterationResult<T>;
            reset(): this;
    }
}

declare module 'alot/streams/ForEachStream' {
    import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    import { AlotStreamOpts } from 'alot/AlotMeta';
    export interface ForEachMethod<T> {
        (x: T, i?: number): void | any | never;
    }
    export class ForEachStream<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        fn: ForEachMethod<T>;
        constructor(stream: IAlotStream<T>, fn: ForEachMethod<T>, opts?: AlotStreamOpts);
        next(): any;
        nextAsync(): Promise<any>;
        reset(): this;
    }
}

declare module 'alot/streams/ForkStream' {
    import { IAlotStream } from 'alot/streams/IAlotStream';
    import { AlotProto } from "alot/AlotProto";
    export interface ForkMethod<T> {
        (x: IAlotStream<T>): void | any;
    }
    export class ForkStreamInner<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        fn: ForkMethod<T>;
        _cached: any[];
        constructor(stream: IAlotStream<T>, fn: ForkMethod<T>);
        next(): any;
        nextAsync(): Promise<any>;
        reset(): this;
        pluck(): any;
        has(i: number): boolean;
        get(i: number): any;
    }
    export class ForkStreamOuter<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        inner: ForkStreamInner<T>;
        _index: number;
        _plucked: boolean;
        constructor(stream: IAlotStream<T>, inner: ForkStreamInner<T>);
        next(): any;
        nextAsync(): Promise<any>;
        reset(): this;
    }
}

declare module 'alot/streams/SortedStream' {
    import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    import { ParametersFromSecond } from 'alot/utils/types';
    export interface SortMethod<T> {
        (x: T, i?: number): string | number | bigint | {
            valueOf(): number | string;
        };
    }
    export class SortByStream<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        direction: 'asc' | 'desc';
        isAsync: boolean;
        constructor(stream: IAlotStream<T>, mix: SortMethod<T> | keyof T | string, direction?: 'asc' | 'desc');
        next(): any;
        reset(): this;
    }
    export class SortByLocalCompareStream<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        getValue: (x: T, i?: number) => string;
        direction: 'asc' | 'desc';
        params: ParametersFromSecond<String['localeCompare']>;
        isAsync: boolean;
        constructor(stream: IAlotStream<T>, getValue: (x: T, i?: number) => string, direction: 'asc' | 'desc', params: ParametersFromSecond<String['localeCompare']>);
        next(): any;
        reset(): this;
    }
}

declare module 'alot/streams/JoinStream' {
    import { IAlotStream } from "alot/streams/IAlotStream";
    import { AlotProto } from "alot/AlotProto";
    import { AlotStreamOpts } from 'alot/AlotMeta';
    export interface MethodJoin<TOuter, TInner = TOuter, TResult = TOuter> {
        (inner: TInner[], getOuterKey: (x: TOuter) => string | number, getInnerKey: (x: TInner) => string | number, joinFn: (a: TOuter, b: TInner) => TResult): TResult | PromiseLike<TResult>;
    }
    export interface MethodJoin<TOuter, TInner = TOuter, TResult = TOuter> {
        (inner: TInner[], getOuterKey: (x: TOuter) => string | number, getInnerKey: (x: TInner) => string | number, joinFn: (a?: TOuter, b?: TInner) => TResult): TResult | PromiseLike<TResult>;
    }
    export type JoinType = 'inner' | 'outer';
    export class JoinStream<TOuter, TInner = TOuter, TResult = TOuter> extends AlotProto<TResult, TOuter> {
        stream: IAlotStream<TOuter>;
        constructor(stream: IAlotStream<TOuter>, inner: TInner[], fnKeyOuter: (x: TOuter) => string | number, fnKeyInner: (x: TInner) => string | number, joinFn: (a?: TOuter, b?: TInner) => TResult, joinType: JoinType, opts?: AlotStreamOpts);
        next(): any;
        nextAsync(): Promise<any>;
        reset(): this;
    }
    export interface MethodMapMany<T, TResult> {
        (x: T, i?: number): TResult[] | PromiseLike<TResult[]>;
    }
    export class MapManyStream<T, TResult> extends AlotProto<TResult, T> {
        stream: IAlotStream<T>;
        fn: MethodMapMany<T, TResult>;
        opts?: AlotStreamOpts;
        constructor(stream: IAlotStream<T>, fn: MethodMapMany<T, TResult>, opts?: AlotStreamOpts);
        next(): any;
        nextAsync(): any;
        reset(): this;
    }
}

