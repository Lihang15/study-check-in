-- 创建 task 表
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR,
    task_content VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

-- 创建索引（对应 index=True）
CREATE INDEX idx_task_id ON task (id);
CREATE INDEX idx_task_task_name ON task (task_name);
