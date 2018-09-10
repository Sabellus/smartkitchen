CREATE OR REPLACE FUNCTION insert_bb(_table regclass, _value any)
RETURNS void AS
$func$
BEGIN
EXECUTE 'INSERT INTO '|| _table ||' VALUES '|| quote_ident(_value) ||'';
END
$func$ LANGUAGE plpgsql;