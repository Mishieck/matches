export type RecordKey = string | number | symbol;

export type GenericRecord<
  Key extends RecordKey = RecordKey,
  Value = unknown
> = Record<Key, Value>;
