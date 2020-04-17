// Generated by dts-bundle v0.7.3

declare module 'alot' {
    
    import { Alot as AlotInner } from 'alot/alot';
    import { AlotMeta } from 'alot/AlotMeta';
    interface IAlotConstructor {
        new <T>(array: T[], meta?: AlotMeta): AlotInner<T>;
        <T>(array: T[], meta?: AlotMeta): AlotInner<T>;
        default: IAlotConstructor;
        fromObject: typeof AlotInner.fromObject;
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
    import { IAlotStream, AlotStreamIterationResult, GroupByKeyFn, GroupByStream, DistinctByKeyFn, DistinctByStream, SkipStream, SkipWhileMethod, SkipWhileStream, TakeStream, TakeWhileStream, TakeWhileMethod, MapStream, MapManyStream, MethodMap, MethodMapMany, FilterStream, FilterStreamAsync, ForEachStream, ForEachMethod, SortByStream, SortMethod, JoinStream } from 'alot/streams/exports';
    export class AlotProto<T, TSource = T> implements IAlotStream<T> {
        stream: IAlotStream<TSource>;
        isAsync: boolean;
        constructor(stream: IAlotStream<TSource>, opts?: AlotStreamOpts);
        next(): AlotStreamIterationResult<T>;
        nextAsync(): Promise<AlotStreamIterationResult<T>>;
        reset(): this;
        filter(fn: MethodFilter<T>): FilterStream<T>;
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
        distinctBy(fn: DistinctByKeyFn<T>): DistinctByStream<T, string>;
        distinct(): DistinctByStream<T, string | number>;
        sortBy(sortByFn: SortMethod<T>, direction?: 'asc' | 'desc'): SortByStream<T>;
        sortBy(sortByKey: keyof T | string, direction?: 'asc' | 'desc'): SortByStream<T>;
        fork(fn: (stream: this) => void | any): this;
        toDictionary<TKey = string, TValue = any>(keyFn: (x: T) => TKey, valFn?: (x: T) => TValue): {
            [key: string]: TValue;
        };
        toDictionaryAsync(keyFn: (x: T) => string | Promise<string> | any, valFn?: (x: T) => Promise<any> | any): Promise<{
            [key: string]: T;
        }>;
        toArray(): T[];
        toArrayAsync(meta?: AlotMetaAsync): PromiseLike<T[]>;
        first(matcher?: (x: T, i?: number) => boolean): T;
        find(matcher?: (x: T, i?: number) => boolean): T;
        sum(getVal: (x: T, i?: number) => number): number;
        sumAsync(getVal: (x: T, i?: number) => number | Promise<number>): Promise<number>;
        max<TOut>(fn: (x: T, i?: number) => TOut): TOut;
        maxAsync<TOut>(fn: (x: T, i?: number) => TOut): Promise<TOut>;
        min<TOut>(fn: (x: T, i?: number) => TOut): TOut;
        minAsync<TOut>(fn: (x: T, i?: number) => TOut): Promise<TOut>;
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
    export { SortByStream, SortMethod } from 'alot/streams/SortedStream';
    export { JoinStream } from 'alot/streams/JoinStream';
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
    export interface DistinctByKeyFn<T, TKey = string> {
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
    export interface SortMethod<T> {
        (x: T, i?: number): string | number;
    }
    export class SortByStream<T> extends AlotProto<T> {
        stream: IAlotStream<T>;
        direction: 'asc' | 'desc';
        isAsync: boolean;
        constructor(stream: IAlotStream<T>, mix: SortMethod<T> | keyof T | string, direction?: 'asc' | 'desc');
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

