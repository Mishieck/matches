/** The key of a `Record` */
export type RecordKey = string | number | symbol;

/** A generic record for to be used to create record types */
export type GenericRecord<
  Key extends RecordKey = RecordKey,
  Value = unknown
> = Record<Key, Value>;
