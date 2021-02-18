import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class Formatter {
    /**
     * @param {Array<Card>} cards 
     * @returns {Row}
     */
    static getCardCompilation(cards) {
        var cols = [];

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i] || <Card />;

            cols.push(
                <Col key={i} className="px-1 pb-3 d-flex justify-content-center">
                    {card}
                </Col>
            );
        }

        return <Row>{cols}</Row>;
    }
}