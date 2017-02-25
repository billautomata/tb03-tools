# hidden markov model

A probabilistic state machine populated with note values.

For each note in each sequence build a hash-table of the counts next notes found

```javascript
var data = {
  "C60": {
    "D62": 700,
    "E64": 300
  }
}
```

Then normalize each element in the hash-table to get the probabilities.
```javascript
var data = {
  "C60": {
    "D62": 0.7,
    "E64": 0.3
  }
}
```

So if you get the note `C60` there is a 70 percent chance of going to `D62`.
