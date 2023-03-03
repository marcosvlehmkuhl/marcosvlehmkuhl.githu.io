---
  created: 2022-11-19
  date: 2022-11-19
  tags: posts
  title: Recursive Query on SQL
  status: draft
  layout: post.njk
  css: postgres-recursive.css
  # layout: posts/postgres-recursive-cte.njk
---

# Postgres Recursive Query

SQL databases are powerful and simple, most of the time all you need to know is the basics, `SELECT`, `JOIN`, `WHERE` but sometimes you will face problems where the basic stuff won't help. Recently I got one of those problems and Recursive CTE came to help.

## @todoCTE[Think on a better title]@endtodo

Ok, first what is CTE.
CTE stands for _Common Table Expression_ and it is a temporary table that exists only for on query, as soon the query returns a result that table cease to exist. @todoIt is a great way to break up complex queries[rephrase this setence]@endtodo.

## CTE Recursive

The CTE Recursive allows the query to reference itself. A recursive CTE will repeat over a subset of the query untill it obtains all data it can. Recursive CTE have the following structure

```sql
WITH RECURSIVE name (col1, col2...) AS (
  non_recursive_part
  UNION ALL
  recursive_part
)
```

## Why?

Recursives queries are good when you have some graph-like structure.
Let's see an example. What if you wanted to know the ancestry tree of someone. Let's try to model the database and query the data.

## Example

Suppose we have the following data representing a Secret Santa Game

<table class="sql-table">
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>secret_sant_id</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>3</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Bob Doe</td>
      <td>4</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Jane Doe</td>
      <td>2</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Foo Dane</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

So what if we wanted to get a table that showed every participant in the same order in which they've played the game.
We want the order to be John Doe, Jane Doe, Bob Doe and Foo Dane. We can do that with Recursive CTE

```sql/1,3/5-8
WITH RECURSIVE next_participant AS (
    SELECT *
    FROM participant
    WHERE NAME = 'John Doen'
  UNION
    SELECT participant.*
    FROM participant
    INNER JOIN next_participant ON participant.id = next_participant.secret_sant_id
)
SELECT * FROM next_participant;
```

The result would be

<table class="sql-table">
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>secret_sant_id</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>3</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Jane Doe</td>
      <td>2</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Bob Doe</td>
      <td>4</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Foo Dane</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
