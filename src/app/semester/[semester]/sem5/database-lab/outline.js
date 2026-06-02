export const SQLCourse = {
    outline: `Introduction to SQL environment: writing basic SQL statements; SELECT statement, arithmetic expressions, operator precedence, null values, column alias, concatenation operator, displaying table structure. FROM clause: table list and table aliases. Restricting and sorting data: WHERE clause, comparison and logical operators, ORDER BY clause. Single-row functions: character, number, date, and type conversion functions. Multi-row functions: SUM, AVG, standard deviation, variance, grouping data, GROUP BY clause, HAVING clause. Joins: cross product, natural join, equi-join, non-equi join, left outer join, right outer join, self join. Subqueries: syntax, multiple-column subqueries, pairwise and non-pairwise comparison, null handling, subqueries in FROM clause. Table creation and modification: CREATE TABLE, constraints (NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK), ALTER TABLE, DROP statement. Data manipulation: INSERT, UPDATE, DELETE. SQL objects: views, sequences, indexes. User management: create user, privileges, user groups, GRANT and REVOKE statements.`,

    textBooks: [
        {
            title: "Oracle Database 11g PL/SQL Programming",
            authors: [
                "Michael McLaughlin"
            ],
            edition: "1st",
            publisher: "McGraw-Hill Education",
            year: 2008,
            isbn: "0071494456"
        }
    ],

    referenceMaterials: [
        {
            title: "Modern Database Management",
            authors: [
                "Jeffrey A. Hoffer",
                "Ramesh Venkataraman",
                "Heikki Topi"
            ],
            edition: "12th",
            publisher: "Pearson",
            year: 2015,
            isbn: "0133544613"
        },
        {
            title: "Database Systems: A Practical Approach to Design, Implementation, and Management",
            authors: [
                "Thomas Connolly",
                "Carolyn Begg"
            ],
            edition: "6th",
            publisher: "Pearson",
            year: 2015,
            isbn: "1292061189"
        }
    ]
};